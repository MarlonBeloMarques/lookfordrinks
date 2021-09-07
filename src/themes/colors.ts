import {darken, lighten} from 'polished';

const primary = '#F96D00';
const secondary = '#222831';
const tertiary = '#393E46';
const disabled = '#F2F2F2';

export default {
  white: '#FFFFFF',
  text: '#232323',
  info: '#4096D1',
  success: '#357a38',
  warning: '#F5B800',
  failure: '#EC4E49',
  disabled: {
    light: lighten(0.05, disabled),
    main: disabled,
    dark: darken(0.3, disabled),
    contrast: '#CCCCCC',
  },
  primary: {
    light: lighten(0.05, primary),
    main: primary,
    dark: darken(0.12, primary),
    contrast: '#FFFFFF',
  },
  secondary: {
    light: lighten(0.05, secondary),
    main: secondary,
    dark: darken(0.1, secondary),
    contrast: '#FFFFFF',
  },
  tertiary: {
    light: lighten(0.05, tertiary),
    main: tertiary,
    dark: darken(0.1, tertiary),
    contrast: '#FFFFFF',
  },
};
