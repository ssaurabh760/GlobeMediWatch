import volunteerModel from '../models/volunteers.js';
import * as campsService from './camps-service.js';
import mongoose from 'mongoose';    
import * as userService from './user-service.js';

/**
 * Create a new volunteer
 * @param {*} volunteerDetails 
 * @returns 
 */
export const createVolunteer = async (volunteerData) => {
    try {
      const newVolunteer = new volunteerModel(volunteerData);
      return await newVolunteer.save();
    } catch (error) {
      console.log('Error creating volunteer:', error);
      throw new Error("Error creating volunteer");
    }
  };

/**
 * Retrieve all volunteers
 * @returns 
 */
export const getAllVolunteers = async () => {
    try {
        return await volunteerModel.find().exec();
    } catch (error) {
        throw new Error("Error fetching volunteers");
    }
}

/**
 * Retrieve a specific volunteer by ID
 * @param {*} id
 * @returns
 */
export const getVolunteerById = async (id) => {
    try {
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid volunteer ID");
      }
  
      const volunteer = await volunteerModel.findById(id).populate('campsVolunteered').exec();
  
      if (!volunteer) {
        console.log('Volunteer not found');
        return null;
      }
  
      return volunteer;
    } catch (error) {
      console.error('Error fetching volunteer by ID:', error);
      throw new Error("Error fetching volunteer by ID");
    }
  };

/**
 * Update a specific volunteer by ID
 * @param {*} volunteerID 
 * @param {*} updatedDetails 
 * @returns 
 */
export const updateVolunteerById = async (id, updatedDetails) => {
    try {
        return await volunteerModel.findByIdAndUpdate(id, updatedDetails, { new: true }).exec();
    } catch (error) {
        throw new Error("Error updating volunteer");
    }
}

/**
 * Delete a specific volunteer by ID
 * @param {*} volunteerID 
 * @returns 
 */
export const deleteVolunteerById = async (id) => {
    try {
        return await volunteerModel.findByIdAndDelete(id).exec();
    } catch (error) {
        throw new Error("Error deleting volunteer");
    }
}

/**
 * Register a volunteer for a specific camp
 * @param {*} volunteerID
 * @param {*} campID
 * @returns
 */
export const registerVolunteerForCamp = async (volunteerID, campID) => {
    try {
        const volunteer = await volunteerModel.findById(volunteerID);
        const camp = await campsService.getCampById(campID);

        if (!volunteer || !camp) {
            throw new Error("Volunteer or Camp not found");
        }

        volunteer.campsVolunteered.push(campID);
        await campsService.addVolunteerToCamp(campID, volunteerID);
        return await volunteer.save();
    } catch (error) {
        throw new Error("Error registering volunteer for camp");
    }
};

/**
 * Remove a volunteer from a specific camp
 * @param {*} volunteerID
 * @param {*} campID
 * @returns
 */
export const removeVolunteerFromCamp = async (volunteerID, campID) => {
    try {
        const volunteer = await volunteerModel.findById(volunteerID);
        const camp = await campsService.getCampById(campID);

        if (!volunteer || !camp) {
            throw new Error("Volunteer or Camp not found");
        }

        volunteer.campsVolunteered = volunteer.campsVolunteered.filter(camp => camp.toString() !== campID);
        await campsService.removeVolunteerFromCamp(campID, volunteerID);
        return await volunteer.save();
    } catch (error) {
        console.error('Error removing volunteer from camp:', error);
        throw new Error("Error removing volunteer from camp");
    }
};