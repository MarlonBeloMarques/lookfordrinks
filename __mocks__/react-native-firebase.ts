jest.mock('@react-native-firebase/analytics', () => () => ({}));
jest.mock('@react-native-firebase/crashlytics', () => () => ({}));

jest.mock('@react-native-firebase/app', () => {
  return {
    analytics: jest.fn().mockReturnValue({
      setAnalyticsCollectionEnabled: () => jest.fn(),
    }),
    crashlytics: jest.fn().mockReturnValue({
      setCrashlyticsCollectionEnabled: () => jest.fn(),
    }),
  };
});
