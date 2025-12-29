const { getDefaultConfig } = require("expo/metro-config");

// Use Expo's default Metro config.
const config = getDefaultConfig(__dirname);

// Add path aliases so Metro matches TypeScript and Babel.
config.resolver.alias = {
  "@": "./src",
  "@app": "./src/app",
  "@features": "./src/features",
  "@components": "./src/components",
  "@shared": "./src/shared"
};

// Export the final config for Metro to use.
module.exports = config;
