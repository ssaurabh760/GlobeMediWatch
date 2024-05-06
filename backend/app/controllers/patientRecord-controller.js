/**
 * Patient record controller module.
 * @module patientRecordController
 */

import * as patientRecordService from '../services/patientRecord-service.js';
import { setResponse, setError } from './response-handler.js';

/**
 * Create a new patient record.
 * @async
 * @function createPatientRecord
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const createPatientRecord = async (req, res) => {
  try {
    const recordDetails = req.body;
    const newRecord = await patientRecordService.createPatientRecord(recordDetails);
    setResponse(newRecord, res, 201);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get a patient record by ID.
 * @async
 * @function getPatientRecordById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getPatientRecordById = async (req, res) => {
  try {
    const recordId = req.params.id;
    const record = await patientRecordService.getPatientRecordById(recordId);
    if (!record) {
      setResponse({ message: 'Patient record not found' }, res, 404);
      return;
    }
    setResponse(record, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get all patient records.
 * @async
 * @function getAllPatientRecords
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getAllPatientRecords = async (req, res) => {
  try {
    const records = await patientRecordService.getAllPatientRecords();
    setResponse(records, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Update a patient record by ID.
 * @async
 * @function updatePatientRecord
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const updatePatientRecord = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updatedRecord = await patientRecordService.updatePatientRecordById(recordId, req.body);
    if (!updatedRecord) {
      setResponse({ message: 'Patient record not found' }, res, 404);
      return;
    }
    setResponse(updatedRecord, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Delete a patient record by ID.
 * @async
 * @function deletePatientRecord
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const deletePatientRecord = async (req, res) => {
  try {
    const recordId = req.params.id;
    const deletedRecord = await patientRecordService.deletePatientRecordById(recordId);
    if (!deletedRecord) {
      setResponse({ message: 'Patient record not found' }, res, 404);
      return;
    }
    setResponse({ message: 'Patient record deleted successfully' }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get patient records by patient ID.
 * @async
 * @function getPatientRecordsByPatientId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getPatientRecordsByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const records = await patientRecordService.getPatientRecordsByPatientId(patientId);
    setResponse(records, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get patient records by multiple patient IDs.
 * @async
 * @function getPatientRecordsByPatientIds
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getPatientRecordsByPatientIds = async (req, res) => {
  try {
    const patientIds = req.query.patientIds.split(',');
    const patientRecords = await patientRecordService.getPatientRecordsByPatientIds(patientIds);
    setResponse(patientRecords, res);
  } catch (error) {
    console.error('Error in getPatientRecordsByPatientIds:', error);
    setError(error, res);
  }
};