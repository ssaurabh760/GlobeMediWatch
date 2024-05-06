import mongoose from 'mongoose';

/**
 * Represents a service provided by a health organization.
 * @typedef {Object} Service
 * @property {string} serviceName - The name of the service.
 * @property {string} description - The description of the service.
 * @property {mongoose.Schema.Types.ObjectId} offeredBy - The ID of the health organization offering the service.
 */

/**
 * Mongoose schema for the Service model.
 * @type {mongoose.Schema}
 */
const Schema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    offeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthOrganization',
        required: true
    }
});

/**
 * Mongoose model for the Service schema.
 * @type {mongoose.Model<Service>}
 */
const Service = mongoose.model('Service', Schema);

export default Service;
