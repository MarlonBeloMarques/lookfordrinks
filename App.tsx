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
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { ToastMessage } from '~/utils';
import { AnalyticsService } from '~/services';

const App = () => {
  useEffect(() => {
    AnalyticsService.logScreen('App');
  }, []);

  return (
    <View style={styles.view}>
      <StatusBar barStyle="dark-content" />
      <ToastMessage position="top" />
      <Text style={styles.text}>LOOK FOR DRINKS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
