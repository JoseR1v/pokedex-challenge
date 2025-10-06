module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/tests/**/*.test.ts?(x)'],
  setupFiles: ['<rootDir>/jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-|@react-navigation|@react-native-community|expo(nent)?|@expo(nent)?/.*|expo-.*|@expo/.*|react-native-reanimated|react-native-svg|react-native-gesture-handler)',
  ],
};
