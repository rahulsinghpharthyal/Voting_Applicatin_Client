import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios, { axiosPrivate } from '../../customAxios/privateAxios';


export const getAllCandidate = createAsyncThunk('/get-candidate', async(_, {rejectWithValue})=>{
    try{
        const {data} = await customAxios.get('/api/v1/candidate/get-candidate', {
            withCredentials: true
        });
        return data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data?.message || error?.message)
    }   
});


export const createCandidate = createAsyncThunk('/create-candidate', async(formData, {rejectWithValue}) => {
    try{
        const { data } = await axiosPrivate.post('/api/v1/candidate/create-candidate', formData);
        return data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data.message || error.message)
    }
});

export const updateCandidate = createAsyncThunk('/update-candidate', async({candidateId, formData}, {rejectWithValue})=>{
    try{
        console.log(candidateId, formData)
        const {data} = await axiosPrivate.patch(`/api/v1/candidate/update-candidate/${candidateId}`, formData);
        console.log(data);
        return data;

    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data.message || error.message)
    }
})

export const deleteCandidate = createAsyncThunk('/delete-candidate', async(candidateId, {rejectWithValue})=>{
    try{
        const {data} = await axiosPrivate.delete(`/api/v1/candidate/delete-candidate/${candidateId}`);
        return data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data.message || error.message)
    }
})