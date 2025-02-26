import axios from 'axios';

const BACK_URL = "http://localhost:3000/api";

export const backApi = axios.create({
    baseURL: BACK_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });