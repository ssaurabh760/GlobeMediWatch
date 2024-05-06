import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Fundraiser } from "../../models/fundriaser"; 
import { AppState } from "..";
//Redux Slice for Fundraisers
export type FundraisersState = Fundraiser[];
const initialState: FundraisersState = [];

export const fundraisersSlice = createSlice({
    name: 'fundraisers',
    initialState: initialState,
    reducers: {
        loadFundraisers: (state: FundraisersState , action: PayloadAction<FundraisersState>) => {
            return [...action.payload];
        }
    }
});

// Actions
export const { loadFundraisers } = fundraisersSlice.actions;

// Selectors
export const getAllFundraisers = (): ((state: AppState) => FundraisersState) => {
    return (state: AppState) => state.fundraisers;
}

// Reducer
export default fundraisersSlice.reducer;
