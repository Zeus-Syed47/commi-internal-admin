import axios from "axios";
import store from "@/store/index";

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API, // Replace with your API base URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    // const accessToken = JSON.parse(localStorage.getItem('token'))
    const authToken = store?.getState().accessToken;

    // // If token is present add it to request's Authorization Header
    if (authToken) {
      if (config.headers) config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInterceptorInstance;
