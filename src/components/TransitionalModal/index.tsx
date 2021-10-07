import React, { FC, memo, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Block from '../Block';

type Props = {
  initialPositionY: number;
  finished?: (e: boolean) => void;
};

const TransitionalModal: FC<Props> = ({
  initialPositionY,
  finished = () => {},
}) => {
  const animationValueOrange = useSharedValue(1);
  const animationValueWhite = useSharedValue(1);

  const handleFinished = () => {
    finished(true);
  };

  useEffect(() => {
    animationValueOrange.value = withTiming(0, {
      duration: 400,
      easing: Easing.linear,
    });

    setTimeout(() => {
      animationValueWhite.value = withTiming(
        0,
        {
          duration: 400,
          easing: Easing.linear,
        },
        (finished: boolean) => {
          if (finished) {
            runOnJS(handleFinished)();
          }
        },
      );
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
