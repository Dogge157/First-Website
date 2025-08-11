// Configuration for API endpoints
const config = {
  // Development API URL (localhost)
  development: {
    apiUrl: 'http://localhost:5001'
  },
  // Production API URL (from environment variable)
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5001'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate API URL
export const API_BASE_URL = config[environment as keyof typeof config].apiUrl;

// Helper function to build API endpoints
export const buildApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`; 