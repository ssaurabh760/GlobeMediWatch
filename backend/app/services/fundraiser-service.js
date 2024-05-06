import Fundraiser from '../models/fundraiser-model.js';

/**
 * Create a new fundraiser.
 * @param {string} title The title of the fundraiser.
 * @param {string} description The description of the fundraiser.
 * @param {number} goalAmount The fundraising goal amount.
 * @param {number} currentAmount The current amount raised.
 * @param {String} associatedCampID The ID of the associated campaign.
 * @returns {Promise<Object>} A promise that resolves to the newly created fundraiser object.
 */
export const createFundraiser = async (title, description, goalAmount, currentAmount, associatedCampID) => {
    const newFundraiser = new Fundraiser({
        title,
        description,
        goalAmount,
        currentAmount,
        associatedCampID
    });
    return await newFundraiser.save();
}

/**
 * Retrieve a specific fundraiser by its ID.
 * @param {number} id The ID of the fundraiser to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved fundraiser object.
 */
export const getFundraiserById = async (id) => {
    return await Fundraiser.findById(id).exec();
}

/**
 * Retrieve all fundraisers with a specific associatedCampID.
 * @param {String} associatedCampID The ID of the associated campaign.
 * @returns {Promise<Array>} A promise that resolves to an array containing all fundraisers with the specified associatedCampID.
 */
export const getFundraisersByCampId = async (offeredByID) => {
    return await Fundraiser.find({ associatedCampID: offeredByID }).exec();
}


/**
 * Retrieve all fundraisers.
 * @returns {Promise<Array>} A promise that resolves to an array containing all fundraisers.
 */
export const getAllFundraisers = async () => {
    return await Fundraiser.find().exec();
}

/**
 * Update a specific fundraiser by its ID.
 * @param {number} id The ID of the fundraiser to update.
 * @param {Object} updates An object containing the fields to update (title, description, goalAmount, currentAmount, associatedCampID).
 * @returns {Promise<Object>} A promise that resolves to the updated fundraiser object.
 */
export const updateFundraiser = async (id, updates) => {
    return await Fundraiser.findByIdAndUpdate(id, updates, { new: true }).exec();
}

/**
 * Delete a specific fundraiser by its ID.
 * @param {number} id The ID of the fundraiser to delete.
 * @returns {Promise<void>} A promise that resolves once the fundraiser is deleted.
 */
export const deleteFundraiser = async (id) => {
    await Fundraiser.findByIdAndDelete(id).exec();
}

/**
 * Donate to a fundraiser.
 * @param {number} id The ID of the fundraiser to donate to.
 * @param {number} amount The amount to donate.
 * @returns {Promise<void>} A promise that resolves once the donation is made.
 */
export const donateToFundraiser = async (id, amount) => {
    const fundraiser = await Fundraiser.findById(id).exec();
    if (!fundraiser) {
        throw new Error('Fundraiser not found');
    }
    fundraiser.currentAmount += amount;
    await fundraiser.save();
}
