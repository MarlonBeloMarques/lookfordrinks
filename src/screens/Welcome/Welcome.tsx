import React, { FC } from 'react';
import { Block } from '~/components';
import { Beer, SceneWrapper, Title } from './styles';

type Props = {
  beerProgress: number;
  beerSize: number;
  showTitle: boolean;
};

const Welcome: FC<Props> = ({ beerProgress, beerSize, showTitle }) => {
  return (
    <SceneWrapper>
      <Block flex={0.3}>
        {showTitle && (
          <Block animated flex={false} style={[{}, {}]}>
            <Title>LOOK</Title>
            <Title>FOR</Title>
            <Title color="primary">DRINKS</Title>
          </Block>
        )}
      </Block>
      <Block center middle>
        <Beer
          progress={beerProgress}
          style={{ width: beerSize, height: beerSize }}
        />
      </Block>
    </SceneWrapper>
  );
};

export default Welcome;
