import Service from './../models/services-model.js';

/**
 * Create a new service.
 * @param {string} serviceName The name of the service.
 * @param {string} description The description of the service.
 * @param {mongoose.Types.ObjectId} offeredBy The ID of the health organization offering the service.
 * @returns {Promise<Object>} A promise that resolves to the newly created service object.
 */
export const createService = async (serviceName, description, offeredBy) => {
    const newService = new Service({
        serviceName,
        description,
        offeredBy
    });
    return await newService.save();
}

/**
 * Retrieve a specific service by its ID.
 * @param {mongoose.Types.ObjectId} id The ID of the service to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved service object.
 */
export const getServiceById = async (id) => {
    return await Service.findById(id).exec();
}

/**
 * Retrieve all services.
 * @returns {Promise<Array>} A promise that resolves to an array containing all services.
 */
export const getAllServices = async (offeredBy) => {
    const query = {};
    if (offeredBy) {
      query.offeredBy = offeredBy;
    }
    return await Service.find(query).exec();
};

/**
 * Update a specific service by its ID.
 * @param {mongoose.Types.ObjectId} id The ID of the service to update.
 * @param {Object} updates An object containing the fields to update (serviceName, description, offeredBy).
 * @returns {Promise<Object>} A promise that resolves to the updated service object.
 */
export const updateService = async (id, updates) => {
    return await Service.findByIdAndUpdate(id, updates, { new: true }).exec();
}

/**
 * Delete a specific service by its ID.
 * @param {mongoose.Types.ObjectId} id The ID of the service to delete.
 * @returns {Promise<void>} A promise that resolves once the service is deleted.
 */
export const deleteService = async (id) => {
    await Service.findByIdAndDelete(id).exec();
}
