/**
 * Patient record service module.
 * @module patientRecordService
 */

import PatientRecord from '../models/patientRecord-model.js';

/**
 * Create a new patient record.
 * @async
 * @function createPatientRecord
 * @param {Object} recordDetails - The details of the patient record.
 * @returns {Promise<Object>} The newly created patient record.
 * @throws {Error} If an error occurs while creating the patient record.
 */
export const createPatientRecord = async (recordDetails) => {
  try {
    const newRecord = new PatientRecord(recordDetails);
    const savedRecord = await newRecord.save();
    const populatedRecord = await PatientRecord.findById(savedRecord._id)
      .populate('patientID')
      .populate('campID')
      .populate('serviceDetails');
    return populatedRecord;
  } catch (error) {
    throw new Error(`Error creating patient record: ${error.message}`);
  }
};

/**
 * Retrieve a specific patient record by ID.
 * @async
 * @function getPatientRecordById
 * @param {string} id - The ID of the patient record to retrieve.
 * @returns {Promise<Object|null>} The patient record if found, or null if not found.
 * @throws {Error} If an error occurs while fetching the patient record.
 */
export const getPatientRecordById = async (id) => {
  try {
    const record = await PatientRecord.findById(id)
      .populate('patientID')
      .populate('campID')
      .populate('serviceDetails');
    return record;
  } catch (error) {
    throw new Error(`Error fetching patient record: ${error.message}`);
  }
};

/**
 * Retrieve all patient records.
 * @async
 * @function getAllPatientRecords
 * @returns {Promise<Array>} An array of all patient records.
 * @throws {Error} If an error occurs while fetching the patient records.
 */
export const getAllPatientRecords = async () => {
  try {
    const records = await PatientRecord.find({})
      .populate('patientID')
      .populate('campID')
      .populate('serviceDetails');
    return records;
  } catch (error) {
    throw new Error(`Error fetching patient records: ${error.message}`);
  }
};

/**
 * Update a specific patient record by ID.
 * @async
 * @function updatePatientRecordById
 * @param {string} id - The ID of the patient record to update.
 * @param {Object} updatedDetails - The updated details of the patient record.
 * @returns {Promise<Object|null>} The updated patient record if found, or null if not found.
 * @throws {Error} If an error occurs while updating the patient record.
 */
export const updatePatientRecordById = async (id, updatedDetails) => {
  try {
    const updatedRecord = await PatientRecord.findByIdAndUpdate(id, updatedDetails, { new: true })
      .populate('patientID')
      .populate('campID')
      .populate('serviceDetails');
    return updatedRecord;
  } catch (error) {
    throw new Error(`Error updating patient record: ${error.message}`);
  }
};

/**
 * Delete a specific patient record by ID.
 * @async
 * @function deletePatientRecordById
 * @param {string} id - The ID of the patient record to delete.
 * @returns {Promise<Object|null>} The deleted patient record if found, or null if not found.
 * @throws {Error} If an error occurs while deleting the patient record.
 */
export const deletePatientRecordById = async (id) => {
  try {
    const deletedRecord = await PatientRecord.findByIdAndDelete(id);
    return deletedRecord;
  } catch (error) {
    throw new Error(`Error deleting patient record: ${error.message}`);
  }
};

/**
 * Retrieve patient records by patient ID.
 * @async
 * @function getPatientRecordsByPatientId
 * @param {string} patientId - The ID of the patient to retrieve records for.
 * @returns {Promise<Array>} An array of patient records for the specified patient ID.
 * @throws {Error} If an error occurs while fetching the patient records.
 */
export const getPatientRecordsByPatientId = async (patientId) => {
  try {
    const records = await PatientRecord.find({ patientID: patientId })
      .populate('patientID')
      .populate('campID')
      .populate('serviceDetails');
    return records;
  } catch (error) {
    throw new Error(`Error fetching patient records by patient ID: ${error.message}`);
  }
};

/**
 * Retrieve patient records by multiple patient IDs.
 * @async
 * @function getPatientRecordsByPatientIds
 * @param {Array} patientIds - An array of patient IDs to retrieve records for.
 * @returns {Promise<Array>} An array of patient records for the specified patient IDs.
 * @throws {Error} If an error occurs while fetching the patient records.
 */
export const getPatientRecordsByPatientIds = async (patientIds) => {
  try {
    return await PatientRecord.find({ patientID: { $in: patientIds } })
      .populate('campID')
      .populate('serviceDetails')
      .exec();
  } catch (error) {
    throw new Error(`Error fetching patient records by patient IDs: ${error.message}`);
  }
};