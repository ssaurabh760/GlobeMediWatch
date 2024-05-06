/**
 * ManagePatientRecords component
 * Allows managing patient records, including adding, editing, and deleting records
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagePatientRecords.scss';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import { Patient } from '../../models/patient';
import { PatientRecord } from '../../models/patientRecord';
import { Service } from '../../models/service';
import { useSelector, useDispatch } from 'react-redux';
import PatientFormPopup from './CreatePatientForm';
import {
  setPatients,
  setPatientRecords,
  setSelectedPatient,
  setNewRecord,
  setEditingRecord,
  setAlert,
  setServices,
  getAllPatients,
  getAllPatientRecords,
  getSelectedPatient,
  getNewRecord,
  getEditingRecord,
  getAlert,
  getServices,
} from '../../store/slice/patientRecords';

interface ManagePatientRecordsProps {
  healthOrgId: string;
}

/**
 * ManagePatientRecords component
 * @param {ManagePatientRecordsProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ManagePatientRecords: React.FC<ManagePatientRecordsProps> = ({ healthOrgId }) => {
  const dispatch = useDispatch();
  const patients = useSelector(getAllPatients());
  const patientRecords = useSelector(getAllPatientRecords());
  const selectedPatient = useSelector(getSelectedPatient());
  const newRecord = useSelector(getNewRecord());
  const editingRecord = useSelector(getEditingRecord());
  const alert = useSelector(getAlert());
  const services = useSelector(getServices());
  const [showPatientForm, setShowPatientForm] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      fetchPatientRecords();
    }
  }, [selectedPatient]);

  useEffect(() => {
    if (newRecord.campID) {
      dispatch(setServices(newRecord.campID.servicesOffered || []));
    }
  }, [newRecord.campID]);

  /**
   * Fetches patients from the API
   */
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/patients/organization/${healthOrgId}`);
      dispatch(setPatients(response.data));
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  /**
   * Fetches patient records from the API
   */
  const fetchPatientRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/patientRecords/patient/${selectedPatient?._id}`);
      dispatch(setPatientRecords(response.data));
    } catch (error) {
      console.error('Error fetching patient records:', error);
    }
  };

  /**
   * Displays an alert message
   * @param {string} message - Alert message
   * @param {'success' | 'error'} type - Alert type
   * @param {number} duration - Alert duration in milliseconds (default: 3000)
   */
  const showAlert = (message: string, type: 'success' | 'error', duration: number = 3000) => {
    dispatch(setAlert({ message, type }));
    setTimeout(() => dispatch(setAlert(null)), duration);
  };

  /**
   * Handles selecting a patient
   * @param {Patient} patient - Selected patient
   */
  const handleSelectPatient = (patient: Patient) => {
    dispatch(setSelectedPatient(patient));
    dispatch(setNewRecord({ patientID: patient, campID: patient.campsAttended[0] || undefined }));
  };

  /**
   * Handles input change events for form fields
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'campID') {
      const selectedCamp = selectedPatient?.campsAttended.find(camp => camp._id === value);
      dispatch(setNewRecord({ ...newRecord, [name]: selectedCamp, serviceDetails: [] }));
    } else if (name === 'serviceDetails') {
      const selectedServices = Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => option.value);
      dispatch(
        setNewRecord({
          ...newRecord,
          [name]: selectedServices.map(serviceId => services.find(service => service._id === serviceId)).filter(Boolean) as Service[]
        })
      );
    } else {
      dispatch(setNewRecord({ ...newRecord, [name]: value }));
    }
  };

  /**
   * Renders the services dropdown options
   * @returns {JSX.Element[]} Services dropdown options
   */
  const renderServicesDropdown = () => {
    return services.map(service => (
      <option key={service._id} value={service._id}>{service.serviceName}</option>
    ));
  };

  /**
   * Handles adding a new patient record
   */
  const handleAddRecord = async () => {
    if (!selectedPatient || !newRecord.campID || !newRecord.diagnosis || !newRecord.treatmentProvided) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/patientRecords', {
        ...newRecord,
        patientID: selectedPatient._id,
        campID: newRecord.campID._id,
      });
      dispatch(setPatientRecords([...patientRecords, response.data]));
      dispatch(setNewRecord({ patientID: selectedPatient, campID: selectedPatient.campsAttended[0] }));
      showAlert('Patient record added successfully.', 'success');
    } catch (error) {
      console.error('Error adding patient record:', error);
      showAlert('Failed to add patient record. Please try again.', 'error');
    }
  };

  /**
   * Handles editing a patient record
   * @param {PatientRecord} record - Patient record to edit
   */
  const handleEditRecord = async (record: PatientRecord) => {
    dispatch(setEditingRecord(record));
    dispatch(setNewRecord(record));

    try {
      const serviceIds = record.campID.servicesOffered || [];
      const servicePromises = serviceIds.map(serviceId =>
        axios.get(`http://localhost:3000/services/${serviceId}`)
      );
      const serviceResponses = await Promise.all(servicePromises);
      const services = serviceResponses.map(response => response.data);
      dispatch(setServices(services));
    } catch (error) {
      console.error('Error fetching service details:', error);
      showAlert('Failed to fetch service details. Please try again.', 'error');
    }
  };

  /**
   * Handles deleting a patient
   * @param {string | undefined} patientId - ID of the patient to delete
   */
  const handleDeletePatient = async (patientId: string | undefined) => {
    if (patientId) {
      try {
        await axios.delete(`http://localhost:3000/patients/${patientId}`);
        dispatch(setPatients(patients.filter((patient) => patient._id !== patientId)));
        showAlert('Patient deleted successfully.', 'success');
      } catch (error) {
        console.error('Error deleting patient:', error);
        showAlert('Failed to delete patient. Please try again.', 'error');
      }
    }
  };

  /**
   * Handles updating a patient record
   */
  const handleUpdateRecord = async () => {
    if (!editingRecord || !newRecord.diagnosis || !newRecord.treatmentProvided) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3000/patientRecords/${editingRecord._id}`, {
        ...newRecord,
        patientID: selectedPatient?._id,
        campID: newRecord.campID?._id,
      });
      dispatch(setPatientRecords(patientRecords.map((rec) => (rec._id === editingRecord._id ? response.data : rec))));
      if (selectedPatient) {
        dispatch(setNewRecord({ patientID: selectedPatient, campID: selectedPatient.campsAttended[0] || undefined }));
      } else {
        dispatch(setNewRecord({}));
      }
      dispatch(setEditingRecord(null));
      showAlert('Patient record updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating patient record:', error);
      showAlert('Failed to update patient record. Please try again.', 'error');
    }
  };

  /**
   * Handles deleting a patient record
   * @param {string} recordId - ID of the patient record to delete
   */
  const handleDeleteRecord = async (recordId: string) => {
    try {
      await axios.delete(`http://localhost:3000/patientRecords/${recordId}`);
      dispatch(setPatientRecords(patientRecords.filter((rec) => rec._id !== recordId)));
      showAlert('Patient record deleted successfully.', 'success');
      if (editingRecord?._id === recordId) {
        dispatch(setEditingRecord(null));
        dispatch(setNewRecord({}));
      }
    } catch (error) {
      console.error('Error deleting patient record:', error);
      showAlert('Failed to delete patient record. Please try again.', 'error');
    }
  };

  /**
   * Renders the camps dropdown options
   * @returns {JSX.Element[]} Camps dropdown options
   */
  const renderCampsDropdown = () => {
    return selectedPatient?.campsAttended?.map(camp => (
      <option key={camp._id} value={camp._id}>{camp.campName}</option>
    ));
  };

  /**
   * Clears the patient record form
   */
  const clearForm = () => {
    if (selectedPatient) {
      dispatch(setNewRecord({ patientID: selectedPatient, campID: selectedPatient.campsAttended[0] }));
    }
    dispatch(setEditingRecord(null));
  };

  return (
    <div className="manage-patient-records">
      <div className="alert-container">
        {alert && (
          <Alert severity={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}
      </div>
      <h1 className="manage-patient-records-title">Manage Patient Records</h1>

      <button className="add-patient-button" onClick={() => setShowPatientForm(true)}>
        <FaPlus /> Add Patient
      </button>
      <div className="content">
        <div className="patient-selection">
          <h2>Select Patient</h2>
          <ul className="patient-list">
            {patients.map((patient, index) => (
              <li
                key={patient._id}
                className={`patient-item ${selectedPatient?._id === patient._id ? 'selected' : ''}`}
              >
                <div className="patient-info" onClick={() => handleSelectPatient(patient)}>
                  {index + 1}. {patient.firstName} {patient.lastName} (ID: {patient._id})
                </div>
                <button className="delete-patient-button" onClick={() => handleDeletePatient(patient._id)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {showPatientForm && (
          <PatientFormPopup
            onClose={() => setShowPatientForm(false)}
            onSave={async (patient) => {
              try {
                const response = await axios.post('http://localhost:3000/patients', patient);
                dispatch(setPatients([...patients, response.data]));
                showAlert('Patient added successfully.', 'success');
              } catch (error) {
                console.error('Error adding patient:', error);
                showAlert('Failed to add patient. Please try again.', 'error');
              }
            }}
            healthOrgId={healthOrgId}
          />
        )}
        {selectedPatient && (
          <div className="record-form">
            <h2>{editingRecord ? 'Edit Record' : 'Add New Record'}</h2>
            <select name="campID" value={newRecord.campID?._id || ''} onChange={handleInputChange} required>
              {renderCampsDropdown()}
            </select>
            <select
              name="serviceDetails"
              multiple
              value={(newRecord.serviceDetails as Service[])?.map(service => service._id) || []}
              onChange={handleInputChange}
            >
              {renderServicesDropdown()}
            </select>
            <input type="text" name="diagnosis" placeholder="Diagnosis" value={newRecord.diagnosis || ''} onChange={handleInputChange} required />
            <textarea name="treatmentProvided" placeholder="Treatment Provided" value={newRecord.treatmentProvided || ''} onChange={handleInputChange} required />
            <input type="text" name="followUpInstructions" placeholder="Follow-up Instructions" value={newRecord.followUpInstructions || ''} onChange={handleInputChange} />
            <div className="form-actions">
              {editingRecord ? (
                <>
                  <button className="update-button" onClick={handleUpdateRecord}>
                    <FaEdit /> Update
                  </button>
                  <button className="clear-button" onClick={clearForm}>
                    <FaTimes /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="add-button" onClick={handleAddRecord}>
                    <FaPlus /> Add
                  </button>
                  <button className="clear-button" onClick={clearForm}>
                    <FaTimes /> Clear
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {selectedPatient && (
        <div className="patient-records">
          <h2>Patient Records</h2>
          <ul className="record-list">
            {patientRecords.map((record, index) => (
              <li key={record._id} className="record-item">
                <div className="record-info">
                  <p><strong>Record #{index + 1}</strong></p>
                  <p><strong>Record ID:</strong> {record._id}</p>
                  <p><strong>Patient Name:</strong> {record.patientID.firstName} {record.patientID.lastName}</p>
                  <p><strong>Camp Name:</strong> {record.campID ? record.campID.campName : 'No Camp Assigned'}</p>
                  <p><strong>Services Used:</strong> {record.serviceDetails.map(service => service.serviceName).join(", ")}</p>
                  <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                  <p><strong>Treatment Provided:</strong> {record.treatmentProvided}</p>
                  {record.followUpInstructions && <p><strong>Follow-up Instructions:</strong> {record.followUpInstructions}</p>}
                </div>
                <div className="record-actions">
                  <button className="edit-button" onClick={() => handleEditRecord(record)}>
                    <FaEdit />
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteRecord(record._id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManagePatientRecords;