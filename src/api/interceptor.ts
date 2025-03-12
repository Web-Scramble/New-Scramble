import { TOKEN } from '@/constants/keys';
import { getItemFromLocalStorage } from '@/utils/localStorage';
import axios from 'axios';
 // Adjust the import path

const baseURL = import.meta.env.VITE_API_URL;

// Create the axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = getItemFromLocalStorage(TOKEN); // Replace 'token' with the key you use to store the token

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;