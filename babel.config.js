module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['babel-plugin-styled-components'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
      },
    ],
    ['babel-plugin-root-import', { rootPathSuffix: 'src' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
