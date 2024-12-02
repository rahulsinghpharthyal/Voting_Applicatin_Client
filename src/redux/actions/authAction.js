import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";
import customAxios from '../../customAxios/privateAxios';

export const userLogin = createAsyncThunk('/login-user', async(formData, {rejectWithValue})=>{
    try{
        const {data} = await axiosPrivate.post('/api/v1/login-user', formData);
        return data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error?.response?.data?.message || error?.message)
    }
})


export const userLogout = createAsyncThunk('/logout-user', async(_ ,{rejectWithValue})=>{
    try{
        const {data} = await axiosPrivate.post('/api/v1/logout-user');
        return data;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
})

export const getAllVoter = createAsyncThunk('/getall-voter', async(_, {rejectWithValue})=>{
    try{
        const {data} = await customAxios.get('/api/v1/all-voter');
        console.log(data);
        return data;

    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.error.message || error.message)
    }
})
