global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  
  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  
  return Reanimated;
});


require('./node_modules/react-native-reanimated/src/reanimated2/jestUtils').setUpTests();
