import axios from 'axios';
import { getCurrentUser } from '../services/auth.service';

const BASE_URL = 'http://localhost:5000';

const req = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

req.interceptors.request.use(
  (config: any): any => {
    const token = getCurrentUser();
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default req;