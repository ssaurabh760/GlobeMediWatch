import * as serviceService from '../services/services-service.js';
import { setResponse, setError } from './response-handler.js';

/**
 * Creates a new service.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>}
 */
export const createService = async (request, response) => {
    try {
        const { serviceName, description, offeredBy } = request.body;
        const newService = await serviceService.createService(serviceName, description, offeredBy);
        setResponse(newService, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Retrieves a service by its ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>}
 */
export const getServiceById = async (request, response) => {
    try {
        const { id } = request.params;
        const service = await serviceService.getServiceById(id);
        setResponse(service, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Retrieves all services.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const getAllServices = async (req, res) => {
    try {
        const { offeredBy } = req.query;
        const services = await serviceService.getAllServices(offeredBy);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve services' });
    }
};

/**
 * Updates a service by its ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>}
 */
export const updateService = async (request, response) => {
    try {
        const { id } = request.params;
        const updates = request.body;
        const updatedService = await serviceService.updateService(id, updates);
        setResponse(updatedService, response);
    } catch(error) {
        setError(error, response);
    }
}

/**
 * Deletes a service by its ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>}
 */
export const deleteService = async (request, response) => {
    try {
        const { id } = request.params;
        await serviceService.deleteService(id);
        setResponse({ message: 'Service deleted successfully' }, response);
    } catch(error) {
        setError(error, response);
    }
}
