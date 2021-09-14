import { colors as themeColors } from '~/themes';

const colors = {
  primary: themeColors.primary.main,
  secondary: themeColors.secondary.main,
  tertiary: themeColors.tertiary.main,
  disabled: themeColors.disabled.main,
  text: themeColors.text,
  failure: themeColors.failure,
  info: themeColors.info,
  warning: themeColors.warning,
  white: themeColors.white,
  success: themeColors.success,
};

const getColors = (color: keyof typeof colors): string => colors[color];

export default getColors;
