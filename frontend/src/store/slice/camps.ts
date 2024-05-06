import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AppState} from '../index';
import {Camp} from '../../models/camp'
//Redux Slice for Camps
export type CampsState = Camp[];
//Initial State
const initialState: CampsState = [];

export const campsSlice = createSlice({
    name: 'camps',
    initialState: initialState,
    reducers: {
        loadCamps: (state: CampsState, action: PayloadAction<CampsState>) => {
            return [...action.payload];
        }
    }
});

// Actions
export const {loadCamps} = campsSlice.actions;

// Selectors

export const getAll = (): ((state: AppState) => CampsState) => {
    return (state: AppState) => state.camps;
}


export const findByid = (id: string): ((state: AppState) => Camp | undefined ) => {
    return (state: AppState) => state.camps.find(camp => camp._id === id);
}

// Reducer
export default campsSlice.reducer;

