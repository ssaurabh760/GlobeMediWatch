import HealthOrganizationService from '../services/health-org-service.js';
import { setResponse, setError } from './response-handler.js';

/**
 * Create a new health organization profile
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @returns {Promise<void>}
 */
export const createHealthOrganizationProfile = async (request, response) => {
  try {
    const healthOrgData = request.body;
    const newHealthOrg = await HealthOrganizationService.createProfile(healthOrgData);
    setResponse(newHealthOrg, response);
  } catch (error) {
    console.error("Error creating Health Organization profile: ", JSON.stringify(error, null, 2));
    setError(error, response);
  }
};

/**
 * List all health organizations
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @returns {Promise<void>}
 */
export const listAllHealthOrganizations = async (request, response) => {
  try {
    const healthOrgs = await HealthOrganizationService.listAll();
    setResponse(healthOrgs, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Get a health organization by ID
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @returns {Promise<void>}
 */
export const getHealthOrganizationById = async (request, response) => {
  try {
    const id = request.params.id;
    const healthOrg = await HealthOrganizationService.getById(id);
    setResponse(healthOrg, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Update a health organization profile
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @returns {Promise<void>}
 */
export const updateHealthOrganizationProfile = async (request, response) => {
  try {
    const id = request.params.id;
    const updateData = request.body;
    const updatedHealthOrg = await HealthOrganizationService.updateProfile(id, updateData);
    setResponse(updatedHealthOrg, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Delete a health organization profile
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @returns {Promise<void>}
 */
export const deleteHealthOrganizationProfile = async (request, response) => {
  try {
    const id = request.params.id;
    await HealthOrganizationService.deleteProfile(id);
    setResponse({ message: 'Health Organization profile deleted successfully' }, response, 204);
  } catch (error) {
    setError(error, response);
  }
};