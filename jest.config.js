module.exports = {
  preset: 'react-native',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 15,
      lines: 50,
      statements: 50,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/services/**',
    '!src/utils/helpers/*',
    '!src/utils/hooks/*',
    '!src/themes/**',
  ],
  setupFiles: [
    './__mocks__/react-native-firebase.ts',
    './__mocks__/react-native-config.ts',
    './__mocks__/react-native-flash-message.tsx',
  ],
};