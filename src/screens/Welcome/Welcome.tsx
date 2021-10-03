import React, { FC } from 'react';
import { Block } from '~/components';
import { Beer } from './styles';

const Welcome: FC = () => {
  return (
    <Block center middle>
      <Beer />
    </Block>
  );
};

export default Welcome;
