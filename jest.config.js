/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],

  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|react-native-|@react-navigation|@react-native-community|expo(nent)?|@expo(nent)?/.*|expo-.*|@expo/.*|react-native-svg|react-native-reanimated)/",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  testMatch: [
    "**/__tests__/**/*.(test|spec).(ts|tsx|js)",
    "**/tests/**/*.(test|spec).(ts|tsx|js)",
    "**/*.(test|spec).(ts|tsx|js)",
  ],
};
