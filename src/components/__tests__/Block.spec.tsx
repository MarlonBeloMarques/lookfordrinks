import React from 'react';
import Text from '../Text';
import Block from '../Block';
import { renderWithTheme } from './helpers/renderWithTheme';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Button } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  advanceAnimationByTime,
  withReanimatedTimer,
} from 'react-native-reanimated/src/reanimated2/jestUtils';

interface AnimatedBlockProps {
  sharedValue: { value: number };
}

const AnimatedBlockComponent = ({ sharedValue }: AnimatedBlockProps) => {
  const widthSV = sharedValue;

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(widthSV.value, { duration: 500 }),
    };
  });

  return (
    <Block>
      <Block
        animated
        id="block_animated"
        style={[{ width: 0, height: 80 }, style]}
      />
      <Button
        testID="button"
        title="toggle"
        onPress={() => {
          widthSV.value = 100;
        }}
      />
    </Block>
  );
};

const BlockComponent = () => {
  return <AnimatedBlockComponent sharedValue={useSharedValue(0)} />;
};

const getDefaultStyle = () => ({
  width: 0,
  height: 80,
});

describe('Components: Block', () => {
  test('must find element of value passed as child', () => {
    // given
    const children = <Text>Children</Text>;
    const rendered = renderWithTheme(<Block>{children}</Block>);
    // when
    const response = rendered.getByText('Children');
    // then
    expect(response).toBeTruthy();
  });

  test('execute the animation correctly', async () => {
    withReanimatedTimer(async () => {
      const style = getDefaultStyle();

      const { getByTestId } = renderWithTheme(<BlockComponent />);
      const view = getByTestId('block_animated');
      const button = getByTestId('button');

      expect(view.props.style[0].width).toBe(0);
      expect(view).toHaveAnimatedStyle(style);

      fireEvent.press(button);

      advanceAnimationByTime(500);

      style.width = 100;

      expect(view).toHaveAnimatedStyle(style);
    });
  });
});
