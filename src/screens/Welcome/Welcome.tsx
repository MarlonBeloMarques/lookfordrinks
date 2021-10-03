import React, { FC } from 'react';
import { Block } from '~/components';
import { Beer } from './styles';

type Props = {
  beerProgress: number;
  beerSize: number;
};

const Welcome: FC<Props> = ({ beerProgress, beerSize }) => {
  return (
    <Block>
      <Block center middle>
        <Beer
          progress={beerProgress}
          style={{ width: beerSize, height: beerSize }}
        />
      </Block>
    </Block>
  );
};

export default Welcome;
