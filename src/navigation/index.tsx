import React, { useContext, useRef } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Platform } from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef,
  Theme,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationState, PartialState } from '@react-navigation/routers';
import { AnalyticsService } from '~/services';
import { getColors, getTheme } from '~/utils';
import { HomeScreen, LoginScreen, WelcomeScreen } from '~/screens';
import * as NavigationActions from './actions';
import { Routes } from './routes';

const getActiveRouteName = (
  state: NavigationState | PartialState<NavigationState>,
): string => {
  if (state.index != null) {
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  }
  return '';
};

const MainStack = createStackNavigator<StackParams>();

type Props = {
  setNavigationTop: (navigatorRef: NavigationContainerRef<any>) => void;
};

export const Navigation: React.FC<Props> = ({ setNavigationTop }) => {
  const routeNameRef = useRef<any>();
  const { primary } = useContext(ThemeContext);
  const contextTheme: Theme = {
    dark: false,
    colors: {
      primary: primary.main,
      background: getColors('white'),
      card: primary.main,
      text: getColors('text'),
      border: primary.main,
      notification: primary.main,
    },
  };

  const onNavigationStateChange = (state?: NavigationState) => {
    if (state) {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = getActiveRouteName(state);
      if (previousRouteName !== currentRouteName) {
        AnalyticsService.logScreen(currentRouteName);
      }
      routeNameRef.current = currentRouteName;
    }
  };

  return (
    <NavigationContainer
      ref={setNavigationTop}
      theme={contextTheme}
      onStateChange={onNavigationStateChange}
    >
      <MainStack.Navigator
        initialRouteName={Routes.WELCOME}
        screenOptions={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          title: '',
          headerTintColor: getColors('text'),
          headerLeftContainerStyle: {
            marginLeft: Platform.OS === 'ios' ? getTheme('baseSpacing') : 0,
          },
          headerRightContainerStyle: {
            marginRight: Platform.OS === 'ios' ? getTheme('baseSpacing') : 0,
          },
        }}
      >
        <MainStack.Screen
          options={{ headerShown: false }}
          name={Routes.LOGIN}
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name={Routes.WELCOME}
          component={WelcomeScreen}
        />
        <MainStack.Screen
          options={{
            headerMode: Platform.OS === 'ios' ? 'screen' : 'float',
            presentation: 'transparentModal',
          }}
          name={Routes.HOME}
          component={HomeScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export { Routes, NavigationActions, useNavigation, useRoute, useFocusEffect };
