import React, { FC, useMemo } from 'react';
import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { Block, Button, Text, TransitionalModal } from '~/components';
import { NavigationActions } from '~/navigation';
import { Beer, SceneWrapper, Title } from './styles';

type Props = {
  beerProgress: number;
  beerSize: number;
  showTitle: boolean;
  showDescription: boolean;
  showButton: boolean;
  openTransition: boolean;
  setOpenTransition: (e: boolean) => void;
  initialPosTransitionalY: number;
  setInitialPosTransitionalY: (e: number) => void;
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
  openTransition,
  setOpenTransition,
  initialPosTransitionalY,
  setInitialPosTransitionalY,
  titleStyle,
  descriptionStyle,
  buttonStyle,
}) => {
  const onLayout = (e: LayoutChangeEvent) => {
    setInitialPosTransitionalY(e.nativeEvent.layout.y / 2);
  };

  return (
    <Block>
      {openTransition && (
        <TransitionalModal
          initialPositionY={initialPosTransitionalY}
          finished={(e) => e && NavigationActions.navigate('HOME')}
        />
      )}
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
          {useMemo(
            () => (
              <Beer
                progress={beerProgress}
                style={{ width: beerSize, height: beerSize }}
              />
            ),
            [beerProgress, beerSize],
          )}
        </Block>
        <Block onLayout={onLayout} flex={0.3}>
          {showDescription && (
            <Block animated flex={false} style={[{}, descriptionStyle]}>
              <Text weight="bold" align="left">
                Find your favorite drinks and discover new places to drink
              </Text>
            </Block>
          )}
          {showButton && (
            <Block animated flex={false} style={[{}, buttonStyle]}>
              <Button onPress={() => setOpenTransition(true)}>LETS GO</Button>
            </Block>
          )}
        </Block>
      </SceneWrapper>
    </Block>
  );
};

export default Welcome;
