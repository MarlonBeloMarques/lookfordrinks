import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Button } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  advanceAnimationByTime,
  withReanimatedTimer,
} from 'react-native-reanimated/src/reanimated2/jestUtils';
import Block from '../Block';
import Image from '../Image';
import { renderWithTheme } from './helpers/renderWithTheme';

interface AnimatedImageProps {
  sharedValue: { value: number };
}

const AnimatedImageComponent = ({ sharedValue }: AnimatedImageProps) => {
  const translateY = sharedValue;

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(translateY.value, { duration: 500 }) },
      ],
    };
  });

  return (
    <Block>
      <Image
        id="image_animated"
        animated
        source="https://www.petlove.com.br/images/products/208498/product/Cerveja_Dog_Beer_sem_%C3%81lcool_Sabor_Carne_para_C%C3%A3es_-_335_mL_2319540.jpg?1627668387"
        style={[{ transform: [{ translateY: 0 }] }, style]}
      />
      <Button
        testID="button"
        title="toggle"
        onPress={() => {
          translateY.value = 100;
        }}
      />
    </Block>
  );
};

const ImageComponent = () => {
  return <AnimatedImageComponent sharedValue={useSharedValue(0)} />;
};

const getDefaultStyle = () => ({
  transform: [{ translateY: 0 }],
});

describe('Components: Input', () => {
  test('correctly uses the source string url', async () => {
    const sourceMock =
      'https://www.petlove.com.br/images/products/208498/product/Cerveja_Dog_Beer_sem_%C3%81lcool_Sabor_Carne_para_C%C3%A3es_-_335_mL_2319540.jpg?1627668387';

    const rendered = await renderWithTheme(
      <Image id="image_id" source={sourceMock} />,
    );

    const image = rendered.getByTestId('image_id');

    expect(image.props.source).toStrictEqual({ uri: sourceMock });
  });

  test('correctly uses the source image', async () => {
    const { Beer } = require('~/assets/images');
    const sourceMock = Beer;

    const rendered = await renderWithTheme(
      <Image id="image_id" source={sourceMock} />,
    );

    const image = rendered.getByTestId('image_id');

    expect(image.props.source).toStrictEqual(sourceMock);
  });

  test('execute the animation correctly', async () => {
    withReanimatedTimer(async () => {
      const style = getDefaultStyle();

      const { getByTestId } = renderWithTheme(<ImageComponent />);
      const image = getByTestId('image_animated');
      const button = getByTestId('button');

      expect(image.props.style[0].transform[0].translateY).toBe(0);
      expect(image).toHaveAnimatedStyle(style);

      fireEvent.press(button);

      advanceAnimationByTime(500);

      style.transform = [{ translateY: 100 }];

      expect(image).toHaveAnimatedStyle(style);
    });
  });
});
