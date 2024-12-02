import axios from 'axios';
export const BASE_URL = 'http://localhost:7000'

export default axios.create({
    baseURL: BASE_URL,
});


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });