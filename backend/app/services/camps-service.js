import Camps from '../models/camps-model.js';
import * as volunteerService from './volunteers-service.js';

// Create a new camp
export const createCamp = async (campName,campType, date, description, address, offeredBy, volunteers) => {
    const newCamp = new Camps({
        campName,
        campType,
        date,
        description,
        address,
        offeredBy,
        volunteers
    });
    return await newCamp.save();
}

// Retrieve a specific camp by ID
export const getAllCamps = async () => {
    return await Camps.find().exec();
}

// Retrieve a specific camp by ID
export const getCampById = async (id) => {
    return await Camps.findById(id).exec();
}
// Update a specific camp by ID
export const updateCampById = async (id, updatedDetails) => {
    return await Camps.findByIdAndUpdate(id, updatedDetails, { new: true })
      .populate('servicesOffered')
      .exec();
  };

// Delete a specific camp by ID  
export const deleteCampById = async (id) => {
    console.log("id", id);
    return await Camps.deleteOne({ _id: id }).exec();
}

export const getCampByDate = async (date) => {
    return await Camps.find({ date }).exec();
}

// Retrieve a specific camp by health organization ID
export const getCampsByOfferedBy = async (offeredByID) => {
    try {
      const records = await Camps.find({ offeredBy: offeredByID })
        .populate('servicesOffered')
        .populate('volunteers');
      return records;
    } catch (error) {
      throw new Error(`Error fetching camps by offeredBy: ${error.message}`);
    }
  };

export const getVolunteersForCamps = async (campId) => {
    const records = await Camps.findById(campId)
    .populate('volunteers');
    return records.volunteers;
  }

  export const getCampsByVolunteer = async (volunteerId) => {
    try {
      const records = await Camps.find({ volunteers: volunteerId })
        .populate('volunteers');
      return records;
    } catch (error) {
      throw new Error(`Error fetching camps by volunteerId: ${error.message}`);
    }
  };


  export const search = async (keywords) => {
    const query = {};

    if (keywords) {
        query.$or = [
            { campName: { $regex: keywords, $options: 'i' } },
            { date: { $regex: keywords, $options: 'i' } },
            { address: { $elemMatch: { $regex: keywords, $options: 'i' } } }
        ];
    }

    
    return await Camps.find(query).exec();
}

export const addVolunteerToCamp = async (campId, volunteerId) => {
  try {
    const camp = await Camps.findById(campId).populate('volunteers').exec();
    if (!camp) {
      throw new Error('Camp not found');
    }

    if (!camp.volunteers.includes(volunteerId)) {
      camp.volunteers.push(volunteerId);
      await camp.save();
    }

    return camp;
  } catch (error) {
    throw new Error(`Error adding volunteer to camp: ${error.message}`);
  }
};

export const removeVolunteerFromCamp = async (campId, volunteerId) => {
  try {
    const camp = await Camps.findById(campId).exec();
    if (!camp) {
      throw new Error('Camp not found');
    }
    console.log('camp', camp);
    camp.volunteers = camp.volunteers.filter(volunteer => volunteer.toString() !== volunteerId);
    await camp.save();

    return camp;
  } catch (error) {
    throw new Error(`Error removing volunteer from camp: ${error.message}`);
  }
};