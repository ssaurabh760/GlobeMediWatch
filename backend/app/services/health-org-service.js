import HealthOrganizationModel from '../models/health-org-models.js';
import * as CampsService from './camps-service.js';
import * as ServicesService from './services-service.js';




const HealthOrganizationService = {
  // Creating a new health organization profile
  createProfile: async (orgDetails) => {  
    try {
      
      const { servicesDetails = [], campsDetails = [], ...otherDetails } = orgDetails;

      // Creating services entries, if provided
      const services = await Promise.all(
          servicesDetails.map(service => new Service(service).save())
      );

      // Creating camps entries, if provided
      const camps = await Promise.all(
          campsDetails.map(camp => new Camps(camp).save())
      );

      // creating the HealthOrganization with references to the created services and camps
      const newHealthOrg = new HealthOrganizationModel({
          ...otherDetails,
          services: services.map(service => service._id), // Link service IDs
          camps: camps.map(camp => camp._id) // Link camp IDs
      });

      await newHealthOrg.save();
      return newHealthOrg;
    } catch (error) {
      console.error("Service Error - Creating Health Organization Profile: ", JSON.stringify(error, null, 2));
      throw error;
    }
  },





  // List all health organizations
  listAll: async () => {
    try {
      // Assuming 'services' and 'camps' are fields that need to be populated
      return await HealthOrganizationModel.find().populate('services').populate('camps');
    } catch (error) {
      throw new Error('Error listing all Health Organizations: ' + error.message);
    }
  },


  // Retrieve a specific health organization by ID
  getById: async (id) => {
    try {
      const healthOrg = await HealthOrganizationModel.findById(id);
      if (!healthOrg) {
        throw new Error('Health Organization not found');
      }
      return healthOrg;
    } catch (error) {
      throw new Error('Error finding Health Organization: ' + error.message);
    }
  },

  // Update a health organization's profile
  updateProfile: async (id, updateData) => {
    try {
      const updatedHealthOrg = await HealthOrganizationModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedHealthOrg) {
        throw new Error('Health Organization not found');
      }
      return updatedHealthOrg;
    } catch (error) {
      throw new Error('Error updating Health Organization profile: ' + error.message);
    }
  },

  // Delete a health organization profile
  deleteProfile: async (id) => {
    try {
      const deletedHealthOrg = await HealthOrganizationModel.findByIdAndDelete(id);
      if (!deletedHealthOrg) {
        throw new Error('Health Organization not found');
      }
      return deletedHealthOrg;
    } catch (error) {
      throw new Error('Error deleting Health Organization profile: ' + error.message);
    }
  },


};

export default HealthOrganizationService;
