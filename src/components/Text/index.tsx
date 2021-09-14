import React, { FC, ReactNode } from 'react';
import { colors, typography } from '~/themes';
import { Typography, fontWeights } from './styles';

type Props = {
  variant?: keyof typeof typography | undefined;
  weight?: keyof typeof fontWeights | undefined;
  color?: keyof typeof colors | undefined;
  align?: 'center' | 'right' | 'left' | undefined;
  children?: ReactNode;
};

const Text: FC<Props> = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'text',
  align = 'center',
  ...rest
}) => {
  return (
    <Typography
      variant={variant}
      align={align}
      color={color}
      weight={weight}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Text;
