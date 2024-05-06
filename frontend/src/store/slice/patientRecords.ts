/**
 * Redux slice for managing patient records state
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../index';
import { Patient } from '../../models/patient';
import { PatientRecord } from '../../models/patientRecord';
import { Service } from '../../models/service';

/**
 * Interface for the patient records state
 */
export interface PatientRecordsState {
  patients: Patient[];
  patientRecords: PatientRecord[];
  selectedPatient: Patient | null;
  newRecord: Partial<PatientRecord>;
  editingRecord: PatientRecord | null;
  alert: { message: string; type: 'success' | 'error' } | null;
  services: Service[];
}

/**
 * Initial state for the patient records slice
 */
const initialState: PatientRecordsState = {
  patients: [],
  patientRecords: [],
  selectedPatient: null,
  newRecord: {},
  editingRecord: null,
  alert: null,
  services: [],
};

/**
 * Redux slice for patient records
 */
export const patientRecordsSlice = createSlice({
  name: 'patientRecords',
  initialState: initialState,
  reducers: {
    /**
     * Sets the patients in the state
     * @param {PatientRecordsState} state - Current state
     * @param {PayloadAction<Patient[]>} action - Action with patients payload
     */
    setPatients: (state: PatientRecordsState, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
    },
    /**
     * Sets the patient records in the state
     * @param {PatientRecordsState} state - Current state
     * @param {PayloadAction<PatientRecord[]>} action - Action with patient records payload
     */
    setPatientRecords: (state: PatientRecordsState, action: PayloadAction<PatientRecord[]>) => {
      state.patientRecords = action.payload;
    },
    /**
     * Sets the selected patient in the state
     * @param {PatientRecordsState} state - Current state
     * @param {PayloadAction<Patient | null>} action - Action with selected patient payload
     */
    setSelectedPatient: (state: PatientRecordsState, action: PayloadAction<Patient | null>) => {
      state.selectedPatient = action.payload;
    },
    /**
     * Sets the new record in the state
     * @param {PatientRecordsState} state - Current state
     * @param {PayloadAction<Partial<PatientRecord>>} action - Action with new record payload
     */
    setNewRecord: (state: PatientRecordsState, action: PayloadAction<Partial<PatientRecord>>) => {
      state.newRecord = action.payload;
    },
    /**
     * Sets the editing record in the state
     * @param {PatientRecordsState} state - Current state
     * @param {PayloadAction<PatientRecord | null>} action - Action with editing record payload
     */
    setEditingRecord: (state: PatientRecordsState, action: PayloadAction<PatientRecord | null>) => {
      state.editingRecord = action.payload;
    },
    /**
     * Sets the alert in the state
     * @param {PatientRecordsState} state - Current state
     * @param {PayloadAction<{ message: string; type: 'success' | 'error' } | null>} action - Action with alert payload
     */
    setAlert: (state: PatientRecordsState, action: PayloadAction<{ message: string; type: 'success' | 'error' } | null>) => {
      state.alert = action.payload;
    },
    /**
     * Sets the services in the state
     * @param {PatientRecordsState} state - Current state
     * @param {PayloadAction<Service[]>} action - Action with services payload
     */
    setServices: (state: PatientRecordsState, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
  },
});

/**
 * Exported actions from the patient records slice
 */
export const {
  setPatients,
  setPatientRecords,
  setSelectedPatient,
  setNewRecord,
  setEditingRecord,
  setAlert,
  setServices,
} = patientRecordsSlice.actions;

/**
 * Selector to get all patients from the state
 * @returns {(state: AppState) => Patient[]} Selector function
 */
export const getAllPatients = (): ((state: AppState) => Patient[]) => {
  return (state: AppState) => state.patientRecords.patients;
};

/**
 * Selector to get all patient records from the state
 * @returns {(state: AppState) => PatientRecord[]} Selector function
 */
export const getAllPatientRecords = (): ((state: AppState) => PatientRecord[]) => {
  return (state: AppState) => state.patientRecords.patientRecords;
};

/**
 * Selector to get the selected patient from the state
 * @returns {(state: AppState) => Patient | null} Selector function
 */
export const getSelectedPatient = (): ((state: AppState) => Patient | null) => {
  return (state: AppState) => state.patientRecords.selectedPatient;
};

/**
 * Selector to get the new record from the state
 * @returns {(state: AppState) => Partial<PatientRecord>} Selector function
 */
export const getNewRecord = (): ((state: AppState) => Partial<PatientRecord>) => {
  return (state: AppState) => state.patientRecords.newRecord;
};

/**
 * Selector to get the editing record from the state
 * @returns {(state: AppState) => PatientRecord | null} Selector function
 */
export const getEditingRecord = (): ((state: AppState) => PatientRecord | null) => {
  return (state: AppState) => state.patientRecords.editingRecord;
};

/**
 * Selector to get the alert from the state
 * @returns {(state: AppState) => { message: string; type: 'success' | 'error' } | null} Selector function
 */
export const getAlert = (): ((state: AppState) => { message: string; type: 'success' | 'error' } | null) => {
  return (state: AppState) => state.patientRecords.alert;
};

/**
 * Selector to get the services from the state
 * @returns {(state: AppState) => Service[]} Selector function
 */
export const getServices = (): ((state: AppState) => Service[]) => {
  return (state: AppState) => state.patientRecords.services;
};

export default patientRecordsSlice.reducer;