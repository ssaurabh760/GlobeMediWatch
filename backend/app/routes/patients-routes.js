/**
 * Patient routes module.
 * @module patientRoutes
 */

import express from 'express';
import * as patientController from '../controllers/patient-controller.js';

/**
 * Express router for patient routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for creating a new patient and retrieving all patients.
 * @name CreatePatientAndGetAllPatients
 * @route {POST} /
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/')
  /**
   * Endpoint to create a new patient.
   * @name CreatePatient
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .post(patientController.createPatient)
  
  /**
   * Endpoint to get all patients.
   * @name GetAllPatients
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .get(patientController.getAllPatients);

/**
 * Routes for operations on a patient identified by patientId.
 * @name PatientByIdRoutes
 * @route {GET} /:patientId
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/:patientId')
  /**
   * Endpoint to get a specific patient by ID.
   * @name GetPatientById
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .get(patientController.getPatientById)
  
  /**
   * Endpoint to update a specific patient by ID.
   * @name UpdatePatient
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .put(patientController.updatePatient)
  
  /**
   * Endpoint to delete a specific patient by ID.
   * @name DeletePatient
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .delete(patientController.deletePatient);

/**
 * Route for retrieving patients by organization camps.
 * @name GetPatientsByOrganizationCamps
 * @route {GET} /organization/:healthOrgId
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.get('/organization/:healthOrgId', patientController.getPatientsByOrganizationCamps);

export default router;