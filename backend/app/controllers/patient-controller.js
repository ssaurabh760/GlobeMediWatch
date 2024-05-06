/**
 * Patient controller module.
 * @module patientController
 */

import * as patientService from '../services/patients-service.js';
import { setResponse, setError } from './response-handler.js';

/**
 * Create a new patient.
 * @async
 * @function createPatient
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const createPatient = async (req, res) => {
  try {
    const patientDetails = { ...req.body };
    const newPatient = await patientService.createPatient(patientDetails);
    setResponse(newPatient, res, 201);
  } catch (error) {
    console.log(error);
    setError(error, res);
  }
};

/**
 * Retrieve a specific patient by ID.
 * @async
 * @function getPatientById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await patientService.getPatientById(patientId);
    if (!patient) {
      setResponse({ message: 'Patient not found' }, res, 404);
      return;
    }
    setResponse(patient, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Retrieve all patients.
 * @async
 * @function getAllPatients
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    setResponse(patients, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Update a specific patient by ID.
 * @async
 * @function updatePatient
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const updateData = req.body;
    const updatedPatient = await patientService.updatePatientById(patientId, updateData);
    if (!updatedPatient) {
      setResponse({ message: 'Patient not found' }, res, 404);
      return;
    }
    setResponse(updatedPatient, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Delete a specific patient by ID.
 * @async
 * @function deletePatient
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const deletedPatient = await patientService.deletePatientById(patientId);
    if (!deletedPatient) {
      setResponse({ message: 'Patient not found' }, res, 404);
      return;
    }
    setResponse({ message: 'Patient deleted successfully' }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Retrieve patients who have attended camps organized by a specific organization.
 * @async
 * @function getPatientsByOrganizationCamps
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getPatientsByOrganizationCamps = async (req, res) => {
  try {
    const { healthOrgId } = req.params;
    const patients = await patientService.getPatientsByOrganizationCamps(healthOrgId);
    setResponse(patients, res);
  } catch (error) {
    setError(error, res);
  }
};