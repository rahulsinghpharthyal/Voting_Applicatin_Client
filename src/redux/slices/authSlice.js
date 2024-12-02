import {createSlice} from '@reduxjs/toolkit';
import { getAllVoter, userLogin, userLogout } from '../actions/authAction';

const initialState = {
    isLoading: false,
    user: null,
    allVoter: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
        },
        logoutUser: (state, action)=>{
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(userLogin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action?.payload?.Data;
        })
        .addCase(userLogin.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getAllVoter.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(getAllVoter.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.allVoter = action.payload.Data;
        })
        .addCase(getAllVoter.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(userLogout.pending, (state, action)=>{
            state.isLoading = true;
        })
        .addCase(userLogout.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = null;
        })
        .addCase(userLogout.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const {setUser, logoutUser} = authSlice.actions;

export default authSlice.reducer;