module.exports = {
  preset: 'react-native',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 15,
      lines: 50,
      statements: 50,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/services/**',
    '!src/themes/**',
    '!src/api/request.ts',
    '!src/**/*.d.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-size-matters)/)',
  ],
  modulePathIgnorePatterns: ['helpers'],
  setupFiles: [
    './__mocks__/react-native-firebase.ts',
    './__mocks__/react-native-config.ts',
    './__mocks__/react-native-flash-message.tsx',
  ],
};