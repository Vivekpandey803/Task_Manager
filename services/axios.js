import axios from 'axios';
import Cookies from 'js-cookie';
import store from '@/redux/store';
import { startLoaderAct, stopLoaderAct } from '@/redux/slice/loader.slice';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Default API base URL
});

// Request interceptor to add token and start loader
axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoaderAct()); // Start loader
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    store.dispatch(stopLoaderAct()); // Stop loader on error
    return Promise.reject(error);
  }
);

// Response interceptor to stop loader
axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(stopLoaderAct()); // Stop loader
    return response;
  },
  (error) => {
    store.dispatch(stopLoaderAct()); // Stop loader on error
    return Promise.reject(error);
  }
);

export default axiosInstance;
