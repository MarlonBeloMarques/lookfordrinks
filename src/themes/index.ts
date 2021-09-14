import colors from './colors';
import radius from './radius';
import spacings from './spacings';
import typography from './typography';

export { default as colors } from './colors';
export { default as spacings } from './spacings';
export { default as radius } from './radius';
export { default as typography } from './typography';

const theme = {
  ...colors,
  ...spacings,
  ...radius,
  ...typography,
};

export type ThemeType = typeof theme;
export default theme;
