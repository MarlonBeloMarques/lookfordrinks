import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Block, Text } from '~/components';
import { Beer, SceneWrapper, Title } from './styles';

type Props = {
  beerProgress: number;
  beerSize: number;
  showTitle: boolean;
  showDescription: boolean;
  titleStyle: StyleProp<ViewStyle>;
};

const Welcome: FC<Props> = ({
  beerProgress,
  beerSize,
  showTitle,
  showDescription,
  titleStyle,
}) => {
  return (
    <SceneWrapper>
      <Block flex={0.3}>
        {showTitle && (
          <Block animated flex={false} style={[{}, titleStyle]}>
            <Title>LOOK</Title>
            <Title>FOR</Title>
            <Title color="primary">DRINKS</Title>
          </Block>
        )}
      </Block>
      <Block center middle zIndex={10}>
        <Beer
          progress={beerProgress}
          style={{ width: beerSize, height: beerSize }}
        />
      </Block>
      <Block flex={0.3}>
        {showDescription && (
          <Text weight="bold" align="left">
            Find your favorite drinks and discover new places to drink
          </Text>
        )}
      </Block>
    </SceneWrapper>
  );
};

export default Welcome;
