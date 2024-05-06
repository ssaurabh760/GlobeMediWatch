import mongoose from 'mongoose';

/**
 * Represents a Fundraiser.
 * @typedef {Object} Fundraiser
 * @property {string} title - The title of the fundraiser.
 * @property {string} description - The description of the fundraiser.
 * @property {number} goalAmount - The goal amount of the fundraiser.
 * @property {number} currentAmount - The current amount raised for the fundraiser.
 * @property {string} associatedCampID - The ID of the associated campaign.
 * @property {Array<string>} donors - The IDs of the donors who contributed to the fundraiser.
 */

/**
 * Mongoose schema for the Fundraiser model.
 * @type {mongoose.Schema}
 */
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    },
    associatedCampID: {
        type: String,
        required: true
    },
    donors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

/**
 * Mongoose model for the Fundraiser.
 * @type {mongoose.Model<Fundraiser>}
 */
const Fundraiser = mongoose.model('Fundraiser', Schema);

export default Fundraiser;
