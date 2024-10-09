import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const refreshToken = window.localStorage.getItem("refreshToken");

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`; 
  }
  
  if (refreshToken) {
    config.headers['x-refresh-token'] = refreshToken; 
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpClient;