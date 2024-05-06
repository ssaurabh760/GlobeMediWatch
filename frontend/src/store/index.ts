import { configureStore } from "@reduxjs/toolkit";
import { campsSlice } from './slice/camps';
import { fundraisersSlice } from "./slice/donationSlice";
import { patientRecordsSlice } from "./slice/patientRecords";
import { servicesSlice } from './slice/servicesSlice';

export const store = configureStore({
    reducer: {
        [campsSlice.name]: campsSlice.reducer,
        
        [fundraisersSlice.name]: fundraisersSlice.reducer,

        [patientRecordsSlice.name]: patientRecordsSlice.reducer,

        [servicesSlice.name]: servicesSlice.reducer
    }
});

export type AppStore = typeof store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
