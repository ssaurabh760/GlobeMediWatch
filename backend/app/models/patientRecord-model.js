/**
 * Patient record model module.
 * @module patientRecordModel
 */

import mongoose from "mongoose";

/**
 * Patient record schema definition.
 * @typedef {Object} PatientRecordSchema
 * @property {mongoose.Schema.Types.ObjectId} patientID - The ID of the patient (ref: 'Patient', required).
 * @property {mongoose.Schema.Types.ObjectId} campID - The ID of the camp (ref: 'Camps', required).
 * @property {mongoose.Schema.Types.ObjectId[]} serviceDetails - The IDs of the services provided (ref: 'Service').
 * @property {string} diagnosis - The diagnosis of the patient (required).
 * @property {string} treatmentProvided - The treatment provided to the patient (required).
 * @property {string} followUpInstructions - The follow-up instructions for the patient.
 * @property {Object} timestamps - Mongoose timestamps option for createdAt and updatedAt fields.
 */
const patientRecordSchema = new mongoose.Schema(
  {
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    campID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camps',
      required: true
    },
    serviceDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }
    ],
    diagnosis: {
      type: String,
      required: true
    },
    treatmentProvided: {
      type: String,
      required: true
    },
    followUpInstructions: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

/**
 * Patient record model.
 * @type {mongoose.Model<PatientRecordSchema>}
 */
const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);

export default PatientRecord;