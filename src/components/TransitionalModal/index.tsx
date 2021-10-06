import React, { FC, memo, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
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
  const animationValueOrange = useSharedValue(1);
  const animationValueWhite = useSharedValue(1);

  useEffect(() => {
    animationValueOrange.value = withTiming(0, {
      duration: 400,
      easing: Easing.linear,
    });

    setTimeout(() => {
      animationValueWhite.value = withTiming(0, {
        duration: 400,
        easing: Easing.linear,
      });
    }, 160);
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
        zIndex={1}
        absolute
        animated
        flex={false}
        color="primary"
        style={[
          { transform: [{ translateY: initialPositionY }] },
          animationStyleDefault(animationValueOrange),
        ]}
      />
      <Block
        zIndex={2}
        absolute
        animated
        flex={false}
        style={[
          { transform: [{ translateY: initialPositionY }] },
          animationStyleDefault(animationValueWhite),
        ]}
      />
    </Block>
  );
};

const animationStyleDefault = (animationValue: Animated.SharedValue<number>) =>
  useAnimatedStyle(() => {
    return {
      width: interpolate(
        animationValue.value,
        [1, 0],
        [1, 1600],
        Extrapolate.CLAMP,
      ),
      height: interpolate(
        animationValue.value,
        [1, 0],
        [1, 1600],
        Extrapolate.CLAMP,
      ),
      borderRadius: interpolate(
        animationValue.value,
        [1, 0],
        [10, 900],
        Extrapolate.CLAMP,
      ),
    };
  });

export default memo(TransitionalModal);
