import React, { FC, useEffect, useState } from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Welcome from './Welcome';

const WelcomeContainer: FC = () => {
  const [beerProgress, setBeerProgress] = useState(0);
  const [beerSize, setBeerSize] = useState(1400);

  /** condition */
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  /** animation value */
  const beerAnimationProgress = useSharedValue(0);
  const beerAnimationSize = useSharedValue(1400);
  const titleAnimationOpacity = useSharedValue(0);
  const descriptionAnimation = useSharedValue(100);

  /** style */
  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleAnimationOpacity.value,
    };
  });

  const descriptionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: descriptionAnimation.value }],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      beerAnimationProgress.value = withTiming(
        0.99,
        {
          duration: 300,
          easing: Easing.linear,
        },
        (finished: boolean) => {
          if (finished) {
            runOnJS(setShowTitle)(true);
          }
        },
      );

      beerAnimationSize.value = withTiming(300, {
        duration: 300,
        easing: Easing.linear,
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (showTitle) {
      titleAnimationOpacity.value = withTiming(
        1,
        {
          duration: 1000,
          easing: Easing.linear,
        },
        (finished: boolean) => {
          if (finished) {
            runOnJS(setShowDescription)(true);
          }
        },
      );
    }

    if (showDescription) {
      descriptionAnimation.value = withTiming(0, {
        duration: 300,
        easing: Easing.bounce,
      });
    }
  });

  useDerivedValue(() => {
    runOnJS(setBeerProgress)(beerAnimationProgress.value);
  }, [beerAnimationProgress]);

  useDerivedValue(() => {
    runOnJS(setBeerSize)(beerAnimationSize.value);
  }, [beerAnimationSize]);

  return (
    <Welcome
      beerProgress={beerProgress}
      beerSize={beerSize}
      showTitle={showTitle}
      showDescription={showDescription}
      titleStyle={titleStyle}
      descriptionStyle={descriptionStyle}
    />
  );
};

export default WelcomeContainer;
