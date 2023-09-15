import axios from "axios";

axios.defaults.baseURL = import.meta.env.REACT_APP_API_BASE_URL;

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your API URL
});

// Request interceptor to add the authorization token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage or another source

    if (token) {
      // If a token exists, add it to the request headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors (e.g., token expiration)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // If the response status is 401 (Unauthorized), the token may be expired or invalid.
      // You can clear the token from localStorage and redirect to the login route.
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to the login route
    }
    return Promise.reject(error);
  }
);

export default api;
