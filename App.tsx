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
import { StatusBar, StyleSheet, View } from 'react-native';
import codePush, { CodePushOptions } from 'react-native-code-push';
import { ThemeProvider } from 'styled-components/native';
import { ToastMessage } from '~/utils';
import { AnalyticsService } from '~/services';
import theme from '~/themes';
import { Text } from '~/components';
import CodePush from './CodePush';

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

const App = () => {
  useEffect(() => {
    AnalyticsService.logScreen('App');
  }, []);

  return (
    <View style={styles.view}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <ToastMessage position="top" />
        <CodePush />
        <Text weight="bold">LOOK FOR DRINKS</Text>
      </ThemeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default codePush(codePushOptions)(App);
