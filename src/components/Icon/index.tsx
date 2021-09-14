import React from 'react';
import { Icons } from '~/utils';
import { colors } from '../../themes';
import getColors from '../../utils/helpers/getColors';

type Props = {
  fontFamily: keyof typeof Icons;
  name: string;
  color: keyof typeof colors;
  size: number;
};

const Icon: React.FC<Props> = ({ fontFamily, name, color, size }) => {
  const createIcon = (): React.ReactElement => {
    const Component = Icons[fontFamily];
    return React.createElement(Component, {
      name,
      size,
      color: getColors(color),
    });
  };

  return createIcon();
};

export default Icon;
