import axios from "axios";

const env = {
    prod: '',
    local: 'http://127.0.0.1:5000'
};

const app_engine_url = env.local;

const user_sign_up = app_engine_url + '/signup' //post
const user_log_in = app_engine_url + '/login'  //post

console.log('API Endpoints:', { 
    signupEndpoint: user_sign_up,
    loginEndpoint: user_log_in
});

// Create an axios instance with common configuration
const api = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

// Set the auth token for all requests if it exists
api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Sign up a new user
 * @param {Object} userData - User signup data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} - Response data
 */
export const signupUser = async (userData) => {
    try {
        const response = await api.post(user_sign_up, userData);
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user_data', JSON.stringify(response.data.user || {}));
        }
        return response.data;
    } catch (error) {
        console.error('Signup error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Network error during signup' };
    }
};

/**
 * Login an existing user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} - Response data
 */
export const loginUser = async (credentials) => {
    try {
      const response = await api.post(user_log_in, credentials);
      if (response && response.data) {
        const uid = response.data.uid;
        // Save both user data and auth token
        localStorage.setItem('user_data', JSON.stringify(response.data || {}));
        localStorage.setItem('auth_token', response.data.uid || '');
        console.log("Response is", response.data);
        return response.data; // Return only the data, not full response
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Network error during login' };
    }
  };
  

/**
 * Logout the user
 */
export const logoutUser = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('auth_token');
};

/**
 * Get current user data
 * @returns {Object|null} - User data or null
 */
export const getCurrentUser = () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
};