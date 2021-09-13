jest.mock('react-native-flash-message', () => {
  const React = require('react');

  return {
    hideMessage: () => jest.fn(),
    showMessage: () => jest.fn(),
    __esModule: true,
    default: jest.fn().mockReturnValue(<></>),
  };
});
