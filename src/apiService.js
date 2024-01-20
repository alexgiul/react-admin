// apiService.js
import axios from 'axios';
import  { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create();

const isTokenAboutToExpire = (token, thresholdMinutes = 5) => {
  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp) {
      const expirationTimestamp = decodedToken.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return expirationTimestamp - currentTimestamp < thresholdMinutes * 60;
    }

    return false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken =  getStoredAccessToken();
  
      if (accessToken && isTokenAboutToExpire(accessToken)) {
        // Token is about to expire, perform token refresh and update the headers
        return refreshToken(accessToken)
          .then((newAccessToken) => {
            updateStoredAccessToken(newAccessToken);
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return config;
          })
          .catch((refreshError) => {
          // Handle token refresh error (e.g., redirect to login page)
          console.error('Token refresh error:', refreshError);
          redirectToLogin();
          throw refreshError;
          });
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

/*  
axiosInstance.interceptors.response.use(
  // Response interceptor
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh the tokens
        const { accessToken } = await refreshTokens();

        // Update the stored tokens
        updateStoredTokens(accessToken, '');

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login page)
        console.error('Token refresh error:', refreshError);
        // Optionally, redirect to the login page or handle the error as needed
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);
*/

const getStoredAccessToken = () => {
  return localStorage.getItem("authToken")
};

// Function to refresh the tokens
const refreshToken = async (accessToken) => {
  try {  
    // Make a request to your server's token refresh endpoint
    const response = await axios.post(process.env.REACT_APP_BACKEND + '/refresh-token',  {},       
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
        
    // Extract and return the new access token and refresh token
    const newAccessToken = response.data.access_token;
    //const newRefreshToken = response.data.refresh_token;
    //return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    return newAccessToken;
  } catch (error) {
    // Handle token refresh failure (e.g., redirect to login page)
    console.error('Token refresh failed:', error);
    throw error;
  }
};

// Function to update the stored tokens
const updateStoredAccessToken = (newAccessToken) => {
  // Update the stored access token and refresh token in localStorage or sessionStorage
  localStorage.setItem('authToken', newAccessToken);
  //localStorage.setItem('refreshToken', newRefreshToken);
};

const redirectToLogin = () => {
  // Use the appropriate navigation mechanism to redirect to the login page
  // This example assumes you are using react-router-dom
  // Replace with your actual routing mechanism or logic
  window.location.href = '/';
};

export default axiosInstance;
