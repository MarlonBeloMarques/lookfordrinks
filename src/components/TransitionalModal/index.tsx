import React, { FC, memo, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Block from '../Block';

type Props = {
  initialPositionY: number;
};

const TransitionalModal: FC<Props> = ({ initialPositionY }) => {
  const animaitonValue = useSharedValue(1);

  const animationStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        animaitonValue.value,
        [1, 0],
        [1, 1600],
        Extrapolate.CLAMP,
      ),
      height: interpolate(
        animaitonValue.value,
        [1, 0],
        [1, 1600],
        Extrapolate.CLAMP,
      ),
      borderRadius: interpolate(
        animaitonValue.value,
        [1, 0],
        [10, 900],
        Extrapolate.CLAMP,
      ),
    };
  });

  useEffect(() => {
    animaitonValue.value = withTiming(0, {
      duration: 400,
      easing: Easing.linear,
    });
  }, []);

  return (
    <Block
      fullBorder
      zIndex={20}
      center
      middle
      absolute
      width={Dimensions.get('screen').width}
      height={Dimensions.get('screen').height}
    >
      <Block
        animated
        flex={false}
        color="primary"
        style={[
          { transform: [{ translateY: initialPositionY }] },
          animationStyle,
        ]}
      ></Block>
    </Block>
  );
};

export default memo(TransitionalModal);
