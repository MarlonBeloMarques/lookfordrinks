import React, { FC } from 'react';
import { Block } from '~/components';
import { Beer } from './styles';

type Props = {
  beerProgress: number;
};

const Welcome: FC<Props> = ({ beerProgress }) => {
  return (
    <Block>
      <Block center middle>
        <Beer progress={beerProgress} />
      </Block>
    </Block>
  );
};

export default Welcome;
