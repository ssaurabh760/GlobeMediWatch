/**
 * Database models module.
 * @module models
 */

import Fundraiser from "./fundraiser-model.js";
import Service from "./services-model.js";
import volunteerModel from "./volunteers.js";
import Camps from "./camps-model.js";
import Patient from "./patient-model.js";
import PatientRecord from "./patientRecord-model.js";
import Notification from "./notification-model.js";
import UserModel from "./user-models.js";
import HealthOrganization from "./health-org-models.js";

/**
 * Object containing all the database models.
 * @type {Object}
 * @property {Object} Fundraiser - The Fundraiser model.
 * @property {Object} Service - The Service model.
 * @property {Object} volunteerModel - The volunteerModel model.
 * @property {Object} Camps - The Camps model.
 * @property {Object} Patient - The Patient model.
 * @property {Object} PatientRecord - The PatientRecord model.
 * @property {Object} Notification - The Notification model.
 * @property {Object} UserModel - The UserModel model.
 * @property {Object} HealthOrganization - The HealthOrganization model.
 */
export default {
  Fundraiser,
  Service,
  volunteerModel,
  Camps,
  Patient,
  PatientRecord,
  Notification,
  UserModel,
  HealthOrganization
};