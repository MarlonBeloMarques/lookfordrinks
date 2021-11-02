import React, { FC, useEffect, useState } from 'react';
import {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/core';
import Welcome from './Welcome';

const WelcomeContainer: FC = () => {
  const [beerProgress, setBeerProgress] = useState(0);
  const [beerSize, setBeerSize] = useState(1400);
  const [initialPosTransitionalY, setInitialPosTransitionalY] = useState(0);

  /** condition */
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [openTransition, setOpenTransition] = useState(false);

  /** animation value */
  const beerAnimation = useSharedValue(0);
  const titleAnimationOpacity = useSharedValue(0);
  const descriptionAnimation = useSharedValue(100);
  const buttonAnimation = useSharedValue(100);

  const isFocused = useIsFocused();

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
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: buttonAnimation.value }],
    };
  });

  useEffect(() => {
    if (!isFocused) {
      setTimeout(() => {
        setOpenTransition(false);
      }, 1000);
    }
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      beerAnimation.value = withTiming(
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
      descriptionAnimation.value = withTiming(
        0,
        {
          duration: 300,
          easing: Easing.bounce,
        },
        (finished: boolean) => {
          if (finished) {
            runOnJS(setShowButton)(true);
          }
        },
      );
    }

    if (showButton) {
      buttonAnimation.value = withTiming(0, {
        duration: 300,
        easing: Easing.bounce,
      });
    }
  });

  useDerivedValue(() => {
    runOnJS(setBeerProgress)(beerAnimation.value);
  }, [beerAnimation]);

  useDerivedValue(() => {
    runOnJS(setBeerSize)(
      interpolate(
        beerAnimation.value,
        [0, 0.99],
        [1400, 300],
        Extrapolate.CLAMP,
      ),
    );
  }, [beerAnimation]);

  return (
    <Welcome
      beerProgress={beerProgress}
      beerSize={beerSize}
      showTitle={showTitle}
      showDescription={showDescription}
      showButton={showButton}
      openTransition={openTransition}
      setOpenTransition={setOpenTransition}
      initialPosTransitionalY={initialPosTransitionalY}
      setInitialPosTransitionalY={setInitialPosTransitionalY}
      titleStyle={titleStyle}
      descriptionStyle={descriptionStyle}
      buttonStyle={buttonStyle}
    />
  );
};

export default WelcomeContainer;
