// store/slices/servicesSlice.ts
/**
 * Redux slice for managing services state
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../index';
import { Service } from '../../models/service';

/**
 * Interface for the services state
 */
export interface ServicesState {
  services: Service[];
  newServiceName: string;
  newServiceDescription: string;
  editingService: Service | null;
  alert: { message: string; type: 'success' | 'error' } | null;
  deletedServiceId: string | null;
  newServiceId: string | null;
}

/**
 * Initial state for the services slice
 */
const initialState: ServicesState = {
  services: [],
  newServiceName: '',
  newServiceDescription: '',
  editingService: null,
  alert: null,
  deletedServiceId: null,
  newServiceId: null,
};

/**
 * Redux slice for services
 */
export const servicesSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    /**
     * Sets the services in the state
     * @param {ServicesState} state - Current state
     * @param {PayloadAction<Service[]>} action - Action with services payload
     */
    setServices: (state: ServicesState, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    /**
     * Sets the new service name in the state
     * @param {ServicesState} state - Current state
     * @param {PayloadAction<string>} action - Action with new service name payload
     */
    setNewServiceName: (state: ServicesState, action: PayloadAction<string>) => {
      state.newServiceName = action.payload;
    },
    /**
     * Sets the new service description in the state
     * @param {ServicesState} state - Current state
     * @param {PayloadAction<string>} action - Action with new service description payload
     */
    setNewServiceDescription: (state: ServicesState, action: PayloadAction<string>) => {
      state.newServiceDescription = action.payload;
    },
    /**
     * Sets the editing service in the state
     * @param {ServicesState} state - Current state
     * @param {PayloadAction<Service | null>} action - Action with editing service payload
     */
    setEditingService: (state: ServicesState, action: PayloadAction<Service | null>) => {
      state.editingService = action.payload;
    },
    /**
     * Sets the alert in the state
     * @param {ServicesState} state - Current state
     * @param {PayloadAction<{ message: string; type: 'success' | 'error' } | null>} action - Action with alert payload
     */
    setAlert: (state: ServicesState, action: PayloadAction<{ message: string; type: 'success' | 'error' } | null>) => {
      state.alert = action.payload;
    },
    /**
     * Sets the deleted service ID in the state
     * @param {ServicesState} state - Current state
     * @param {PayloadAction<string | null>} action - Action with deleted service ID payload
     */
    setDeletedServiceId: (state: ServicesState, action: PayloadAction<string | null>) => {
      state.deletedServiceId = action.payload;
    },
    /**
     * Sets the new service ID in the state
     * @param {ServicesState} state - Current state
     * @param {PayloadAction<string | null>} action - Action with new service ID payload
     */
    setNewServiceId: (state: ServicesState, action: PayloadAction<string | null>) => {
      state.newServiceId = action.payload;
    },
  },
});

/**
 * Exported actions from the services slice
 */
export const {
  setServices,
  setNewServiceName,
  setNewServiceDescription,
  setEditingService,
  setAlert,
  setDeletedServiceId,
  setNewServiceId,
} = servicesSlice.actions;

/**
 * Selector to get all services from the state
 * @returns {(state: AppState) => Service[]} Selector function
 */
export const getAllServices = (): ((state: AppState) => Service[]) => {
  return (state: AppState) => state.services.services;
};

/**
 * Selector to get the new service name from the state
 * @returns {(state: AppState) => string} Selector function
 */
export const getNewServiceName = (): ((state: AppState) => string) => {
  return (state: AppState) => state.services.newServiceName;
};

/**
 * Selector to get the new service description from the state
 * @returns {(state: AppState) => string} Selector function
 */
export const getNewServiceDescription = (): ((state: AppState) => string) => {
  return (state: AppState) => state.services.newServiceDescription;
};

/**
 * Selector to get the editing service from the state
 * @returns {(state: AppState) => Service | null} Selector function
 */
export const getEditingService = (): ((state: AppState) => Service | null) => {
  return (state: AppState) => state.services.editingService;
};

/**
 * Selector to get the alert from the state
 * @returns {(state: AppState) => { message: string; type: 'success' | 'error' } | null} Selector function
 */
export const getAlert = (): ((state: AppState) => { message: string; type: 'success' | 'error' } | null) => {
  return (state: AppState) => state.services.alert;
};

/**
 * Selector to get the deleted service ID from the state
 * @returns {(state: AppState) => string | null} Selector function
 */
export const getDeletedServiceId = (): ((state: AppState) => string | null) => {
  return (state: AppState) => state.services.deletedServiceId;
};

/**
 * Selector to get the new service ID from the state
 * @returns {(state: AppState) => string | null} Selector function
 */
export const getNewServiceId = (): ((state: AppState) => string | null) => {
  return (state: AppState) => state.services.newServiceId;
};

export default servicesSlice.reducer;