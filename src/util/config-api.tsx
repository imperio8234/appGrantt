import axios from 'axios';


const BACK_URL = "http://172.31.93.31:3000/api";

export const backApi = axios.create({
    baseURL: BACK_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });


  backApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );