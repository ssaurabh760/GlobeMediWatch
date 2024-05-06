/**
 * Patient service module.
 * @module patientService
 */

import Patient from '../models/patient-model.js';
import Camp from '../models/camps-model.js';
import mongoose from 'mongoose';

/**
 * Create a new patient.
 * @async
 * @function createPatient
 * @param {Object} patientDetails - The details of the patient.
 * @returns {Promise<Object>} The newly created patient.
 * @throws {Error} If an error occurs while creating the patient.
 */
export const createPatient = async (patientDetails) => {
  try {
    const { campsAttended, ...rest } = patientDetails;

    const newPatient = new Patient(rest);

    if (campsAttended && campsAttended.length > 0) {
      const populatedCamps = await Promise.all(
        campsAttended.map(async (campId) => {
          const camp = await Camp.findById(campId).populate('servicesOffered');
          return camp;
        })
      );

      newPatient.campsAttended = populatedCamps;
    }

    return await newPatient.save();
  } catch (error) {
    throw new Error(`Error creating patient: ${error.message}`);
  }
};

/**
 * Retrieve a specific patient by ID.
 * @async
 * @function getPatientById
 * @param {string} id - The ID of the patient to retrieve.
 * @returns {Promise<Object|null>} The patient if found, or null if not found.
 * @throws {Error} If an error occurs while fetching the patient.
 */
export const getPatientById = async (id) => {
  try {
    // Consider using .populate('campsAttended') if you want to return detailed camp information
    const patient = await Patient.findById(id);
    return patient;
  } catch (error) {
    throw new Error(`Error fetching patient by ID: ${error.message}`);
  }
};

/**
 * Retrieve all patients.
 * @async
 * @function getAllPatients
 * @returns {Promise<Array>} An array of all patients.
 * @throws {Error} If an error occurs while fetching all patients.
 */
export const getAllPatients = async () => {
  try {
    // Consider using .populate('campsAttended') to include camp details
    const patients = await Patient.find({});
    return patients;
  } catch (error) {
    throw new Error(`Error fetching all patients: ${error.message}`);
  }
};

/**
 * Update a specific patient by ID.
 * @async
 * @function updatePatientById
 * @param {string} id - The ID of the patient to update.
 * @param {Object} updatedDetails - The updated details of the patient.
 * @returns {Promise<Object|null>} The updated patient if found, or null if not found.
 * @throws {Error} If an error occurs while updating the patient.
 */
export const updatePatientById = async (id, updatedDetails) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedDetails, { new: true });
    return updatedPatient;
  } catch (error) {
    throw new Error(`Error updating patient: ${error.message}`);
  }
};

/**
 * Delete a specific patient by ID.
 * @async
 * @function deletePatientById
 * @param {string} id - The ID of the patient to delete.
 * @returns {Promise<Object|null>} The deleted patient if found, or null if not found.
 * @throws {Error} If an error occurs while deleting the patient.
 */
export const deletePatientById = async (id) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    return deletedPatient;
  } catch (error) {
    throw new Error(`Error deleting patient: ${error.message}`);
  }
};

/**
 * Add a camp to a patient's 'campsAttended' array.
 * @async
 * @function addCampToPatient
 * @param {string} patientId - The ID of the patient.
 * @param {string} campId - The ID of the camp to add.
 * @returns {Promise<Object>} The updated patient.
 * @throws {Error} If the camp or patient is not found, or if an error occurs while adding the camp to the patient.
 */
export const addCampToPatient = async (patientId, campId) => {
  try {
    // Verify the camp exists
    const camp = await Camp.findById(campId);
    if (!camp) throw new Error('Camp not found');

    // Add camp to patient's 'campsAttended'
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error('Patient not found');

    patient.campsAttended.push(campId);
    await patient.save();
    return patient;
  } catch (error) {
    throw new Error(`Error adding camp to patient: ${error.message}`);
  }
};

/**
 * Remove a camp from a patient's 'campsAttended' array.
 * @async
 * @function removeCampFromPatient
 * @param {string} patientId - The ID of the patient.
 * @param {string} campId - The ID of the camp to remove.
 * @returns {Promise<Object>} The updated patient.
 * @throws {Error} If the patient is not found, or if an error occurs while removing the camp from the patient.
 */
export const removeCampFromPatient = async (patientId, campId) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error('Patient not found');

    patient.campsAttended = patient.campsAttended.filter(camp => camp.toString() !== campId);
    await patient.save();
    return patient;
  } catch (error) {
    throw new Error(`Error removing camp from patient: ${error.message}`);
  }
};

/**
 * Get patients who have attended camps organized by a specific organization.
 * @async
 * @function getPatientsByOrganizationCamps
 * @param {string} healthOrgId - The ID of the health organization.
 * @returns {Promise<Array>} An array of patients with their attended camps and services.
 * @throws {Error} If an error occurs while fetching patients by organization camps.
 */
export const getPatientsByOrganizationCamps = async (healthOrgId) => {
  const objectId = new mongoose.Types.ObjectId(healthOrgId);
  try {
    const patients = await Patient.aggregate([
      {
        $lookup: {
          from: 'camps',
          let: { patientCamps: "$campsAttended" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$_id", "$$patientCamps"] },
                    { $eq: ["$offeredBy", objectId] }
                  ]
                }
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "offeredBy",
                foreignField: "_id",
                as: "organizationDetails"
              }
            },
            {
              $lookup: {
                from: "services",
                localField: "servicesOffered",
                foreignField: "_id",
                as: "servicesOffered"
              }
            },
            {
              $project: {
                "organizationDetails": 1,
                "servicesOffered": 1
              }
            }
          ],
          as: 'camps'
        }
      },
      {
        $lookup: {
          from: 'camps',
          let: { patientCamps: "$campsAttended" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$_id", "$$patientCamps"] },
                    { $eq: ["$offeredBy", objectId] }
                  ]
                }
              }
            },
            {
              $lookup: {
                from: "services",
                localField: "servicesOffered",
                foreignField: "_id",
                as: "servicesOffered"
              }
            }
          ],
          as: 'campsAttended'
        }
      },
      {
        $match: {
          "camps": { $ne: [] }
        }
      }
    ]);
    return patients;
  } catch (error) {
    throw new Error(`Error fetching patients by organization camps: ${error.message}`);
  }
};