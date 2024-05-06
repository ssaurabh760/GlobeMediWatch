import * as fundraiserService from '../services/fundraiser-service.js';
import { setResponse, setError } from './response-handler.js';

/**
 * Creates a new fundraiser.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>}
 */
export const createFundraiser = async (request, response) => {
    try {
        const { title, description, goalAmount, currentAmount, associatedCampID } = {...request.body};
        const newFundraiser = await fundraiserService.createFundraiser(title, description, goalAmount, currentAmount, associatedCampID);
        setResponse(newFundraiser, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Retrieves a fundraiser by its ID.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>}
 */
export const getFundraiserById = async (request, response) => {
    try {
        const { id } = request.params;
        const getfundraiserbyID = await fundraiserService.getFundraiserById(id);
        setResponse(getfundraiserbyID, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Retrieves fundraisers by health organization ID.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>}
 */
export const getFundraisersByCampId = async (request, response) => {
    try {
        const { healthOrgId } = request.params;
        const fundraisers = await fundraiserService.getFundraisersByCampId(healthOrgId);
        setResponse(fundraisers, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Retrieves all fundraisers.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>}
 */
export const getAllFundraisers = async (request, response) => {
    try {
        const getfundraisers = await fundraiserService.getAllFundraisers();
        setResponse(getfundraisers, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Updates a fundraiser by its ID.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>}
 */
export const updateFundraiser = async (request, response) => {
    try {
        const { id } = request.params;
        const updates = request.body;
        const updatedFundraiser = await fundraiserService.updateFundraiser(id, updates);
        setResponse(updatedFundraiser, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Deletes a fundraiser by its ID.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>}
 */
export const deleteFundraiser = async (request, response) => {
    try {
        const { id } = request.params;
        await fundraiserService.deleteFundraiser(id);
        setResponse({ message: 'Fundraiser deleted successfully' }, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Donates to a fundraiser by its ID.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>}
 */
export const donateToFundraiser = async (request, response) => {
    try {
        const { id } = request.params;
        const { amount } = request.body;
        await fundraiserService.donateToFundraiser(id, amount);
        setResponse({ message: 'Donation successful' }, response);
    } catch(error) {
        setError(error, response);
    }
}
