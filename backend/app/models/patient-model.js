/**
 * Patient model module.
 * @module patientModel
 */

import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Patient schema definition.
 * @typedef {Object} PatientSchema
 * @property {string} firstName - The first name of the patient (required).
 * @property {string} lastName - The last name of the patient (required).
 * @property {string} medicalHistory - The medical history of the patient (required).
 * @property {string} currentConditions - The current medical conditions of the patient (required).
 * @property {mongoose.Schema.Types.ObjectId[]} campsAttended - The IDs of the camps attended by the patient (ref: 'Camps').
 */
const patientSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  medicalHistory: {
    type: String,
    required: true
  },
  currentConditions: {
    type: String,
    required: true
  },
  campsAttended: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camps'
    }
  ]
});

/**
 * Patient model.
 * @type {mongoose.Model<PatientSchema>}
 */
const Patient = mongoose.model('Patient', patientSchema);

export default Patient;