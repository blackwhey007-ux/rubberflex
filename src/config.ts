// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function to construct full API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_URL}${endpoint}`;
};
