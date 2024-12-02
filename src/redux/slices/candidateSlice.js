import { createSlice } from "@reduxjs/toolkit";
import { createCandidate, deleteCandidate, getAllCandidate, updateCandidate } from "../actions/candidateAction";

const initialState = {
    isLoading: false,
    candidates: null,
    error: null,
};

const candidateSlice = createSlice({
    name: 'candidate',
    initialState,
    extraReducers : (builder) => {
        builder
        // get All Candidates:-
        .addCase(getAllCandidate.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(getAllCandidate.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.candidates = action?.payload?.success ? action?.payload?.Data : null;
        })
        .addCase(getAllCandidate.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        })
        // Create the Candidate:-
        .addCase(createCandidate.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(createCandidate.fulfilled, (state, action)=>{
            state.isLoading = false;
        })
        .addCase(createCandidate.rejected, (state, action)=>{
            state.isLoading = false;
        })
        // Update the Candidate:-
        .addCase(updateCandidate.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(updateCandidate.fulfilled, (state, action)=>{
            state.isLoading = false;
        })
        .addCase(updateCandidate.rejected, (state, action)=>{
            state.isLoading = false;
        })
        // delete the Candidate:-
        .addCase(deleteCandidate.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(deleteCandidate.fulfilled, (state, action)=>{
            state.isLoading = false;
        })
        .addCase(deleteCandidate.rejected, (state, action)=>{
            state.isLoading = false;
        })
    }
})

export default candidateSlice.reducer;