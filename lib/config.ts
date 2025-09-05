// Configuration utility that works in both development and production
// In development: Uses config.local.js if available
// In production: Uses environment variables

interface Config {
  GLM_API_TOKEN: string;
  GLM_API_URL: string;
}

// Function to get configuration
export const getConfig = (): Config => {
  // For production (Vercel) or when environment variables are set
  if (process.env.GLM_API_TOKEN) {
    return {
      GLM_API_TOKEN: process.env.GLM_API_TOKEN,
      GLM_API_URL: process.env.GLM_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
    };
  }

  // For development - try to import local config
  try {
    // Dynamic import that won't fail in production
    const localConfig = require('../config.local.js');
    return localConfig.config;
  } catch (error) {
    // Fallback error message for missing configuration
    throw new Error(
      'Configuration not found. Please:\n' +
      '1. For development: Copy config.local.example.js to config.local.js and add your API token\n' +
      '2. For production: Set GLM_API_TOKEN environment variable'
    );
  }
};
