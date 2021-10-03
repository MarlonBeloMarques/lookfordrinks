import React, { FC, useEffect, useState } from 'react';
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Welcome from './Welcome';

const WelcomeContainer: FC = () => {
  const [beerProgress, setBeerProgress] = useState(0);
  const [beerSize, setBeerSize] = useState(1400);

  const beerAnimationProgress = useSharedValue(0);
  const beerAnimationSize = useSharedValue(1400);

  useEffect(() => {
    setTimeout(() => {
      beerAnimationProgress.value = withTiming(0.99, {
        duration: 300,
        easing: Easing.linear,
      });

      beerAnimationSize.value = withTiming(300, {
        duration: 300,
        easing: Easing.linear,
      });
    }, 1000);
  }, []);

  useDerivedValue(() => {
    runOnJS(setBeerProgress)(beerAnimationProgress.value);
  }, [beerAnimationProgress]);

  useDerivedValue(() => {
    runOnJS(setBeerSize)(beerAnimationSize.value);
  }, [beerAnimationSize]);

  return <Welcome beerProgress={beerProgress} beerSize={beerSize} />;
};

export default WelcomeContainer;
