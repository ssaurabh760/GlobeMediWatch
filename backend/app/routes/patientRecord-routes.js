/**
 * Patient record routes module.
 * @module patientRecordRoutes
 */

import express from 'express';
import * as patientRecordController from '../controllers/patientRecord-controller.js';

/**
 * Express router for patient record routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for retrieving patient records by multiple patient IDs.
 * @name GetPatientRecordsByPatientIds
 * @route {GET} /patients
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/patients')
  .get(patientRecordController.getPatientRecordsByPatientIds);

/**
 * Route for creating a new patient record and retrieving all patient records.
 * @name CreatePatientRecordAndGetAllPatientRecords
 * @route {POST} /
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/')
  /**
   * Endpoint to create a new patient record.
   * @name CreatePatientRecord
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .post(patientRecordController.createPatientRecord)
  
  /**
   * Endpoint to get all patient records.
   * @name GetAllPatientRecords
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .get(patientRecordController.getAllPatientRecords);

/**
 * Routes for operations on a patient record identified by recordID.
 * @name PatientRecordByIdRoutes
 * @route {GET} /:id
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/:id')
  /**
   * Endpoint to get a specific patient record by ID.
   * @name GetPatientRecordById
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .get(patientRecordController.getPatientRecordById)
  
  /**
   * Endpoint to update a specific patient record by ID.
   * @name UpdatePatientRecord
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .put(patientRecordController.updatePatientRecord)
  
  /**
   * Endpoint to delete a specific patient record by ID.
   * @name DeletePatientRecord
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .delete(patientRecordController.deletePatientRecord);

/**
 * Route for retrieving patient records by patient ID.
 * @name GetPatientRecordsByPatientId
 * @route {GET} /patient/:patientId
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/patient/:patientId')
  .get(patientRecordController.getPatientRecordsByPatientId);

export default router;