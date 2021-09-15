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
import Text from '../Text';
import { renderWithTheme } from './helpers/renderWithTheme';

interface AnimatedTextProps {
  sharedValue: { value: number };
}

const AnimatedTextComponent = ({ sharedValue }: AnimatedTextProps) => {
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
      <Text
        id="text_animated"
        animated
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

const TextComponent = () => {
  return <AnimatedTextComponent sharedValue={useSharedValue(0)} />;
};

const getDefaultStyle = () => ({
  transform: [{ translateY: 0 }],
});

describe('Components: Text', () => {
  test('must find element of value passed as child', () => {
    // given
    const children = 'Look For Drinks';
    const rendered = renderWithTheme(<Text>{children}</Text>);
    // when
    const response = rendered.getByText(children);
    // then
    expect(response).toBeTruthy();
  });

  test('execute the animation correctly', async () => {
    withReanimatedTimer(async () => {
      const style = getDefaultStyle();

      const { getByTestId } = renderWithTheme(<TextComponent />);
      const text = getByTestId('text_animated');
      const button = getByTestId('button');

      expect(text.props.style[0].transform[0].translateY).toBe(0);
      expect(text).toHaveAnimatedStyle(style);

      fireEvent.press(button);

      advanceAnimationByTime(500);

      style.transform = [{ translateY: 100 }];

      expect(text).toHaveAnimatedStyle(style);
    });
  });
});
