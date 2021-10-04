import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Block, Button, Text } from '~/components';
import { Beer, SceneWrapper, Title } from './styles';

type Props = {
  beerProgress: number;
  beerSize: number;
  showTitle: boolean;
  showDescription: boolean;
  showButton: boolean;
  titleStyle: StyleProp<ViewStyle>;
  descriptionStyle: StyleProp<ViewStyle>;
  buttonStyle: StyleProp<ViewStyle>;
};

const Welcome: FC<Props> = ({
  beerProgress,
  beerSize,
  showTitle,
  showDescription,
  showButton,
  titleStyle,
  descriptionStyle,
  buttonStyle,
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
          <Block animated flex={false} style={[{}, descriptionStyle]}>
            <Text weight="bold" align="left">
              Find your favorite drinks and discover new places to drink
            </Text>
          </Block>
        )}
        {showButton && (
          <Block animated flex={false} style={[{}, buttonStyle]}>
            <Button onPress={() => {}}>LETS GO</Button>
          </Block>
        )}
      </Block>
    </SceneWrapper>
  );
};

export default Welcome;
