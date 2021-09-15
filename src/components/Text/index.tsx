import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { colors, typography } from '~/themes';
import { fontWeights } from '~/utils';
import { Typography, TypographyAnimated } from './styles';

type Props = {
  id?: string;
  variant?: keyof typeof typography;
  weight?: keyof typeof fontWeights;
  color?: keyof typeof colors;
  align?: 'center' | 'right' | 'left';
  style?: StyleProp<TextStyle>;
  animated?: boolean;
};

const Text: FC<Props> = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'text',
  align = 'center',
  animated = false,
  style = {},
  id,
  ...rest
}) => {
  if (animated) {
    return (
      <TypographyAnimated
        testID={id}
        variant={variant}
        align={align}
        color={color}
        weight={weight}
        style={style}
        {...rest}
      >
        {children}
      </TypographyAnimated>
    );
  }

  return (
    <Typography
      testID={id}
      variant={variant}
      align={align}
      color={color}
      weight={weight}
      style={style}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Text;
