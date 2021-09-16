/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import codePush, { CodePushOptions } from 'react-native-code-push';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainerRef } from '@react-navigation/core';
import { ToastMessage } from '~/utils';
import { AnalyticsService } from '~/services';
import theme from '~/themes';
import { Block } from '~/components';
import { Navigation, NavigationActions } from '~/navigation';
import CodePush from './CodePush';

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

const App = () => {
  useEffect(() => {
    AnalyticsService.logScreen('App');
  }, []);

  return (
    <Block>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <ToastMessage position="top" />
        <CodePush />
        <Navigation
          setNavigationTop={(navigatorRef: NavigationContainerRef<any>) =>
            NavigationActions.setTopLevelNavigator(navigatorRef)
          }
        />
      </ThemeProvider>
    </Block>
  );
};

export default codePush(codePushOptions)(App);
