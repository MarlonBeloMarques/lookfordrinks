/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet, TextInput } from 'react-native';
import codePush, { CodePushOptions } from 'react-native-code-push';
import { ThemeProvider } from 'styled-components/native';
import { ToastMessage, getTheme } from '~/utils';
import { AnalyticsService } from '~/services';
import theme from '~/themes';
import { Block, Button, Icon, Image, Input, Text } from '~/components';
import CodePush from './CodePush';

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

const App = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submiting, setSubmiting] = useState(false);

  const passwordRef = useRef<TextInput>();

  useEffect(() => {
    AnalyticsService.logScreen('App');
  }, []);

  const handleSubmit = () => {
    setSubmiting(true);
  };

  return (
    <Block middle style={styles.view}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <ToastMessage position="top" />
        <CodePush />
        <Image
          width={150}
          height={150}
          source={
            'https://www.petlove.com.br/images/products/208498/product/Cerveja_Dog_Beer_sem_%C3%81lcool_Sabor_Carne_para_C%C3%A3es_-_335_mL_2319540.jpg?1627668387'
          }
          style={{
            alignSelf: 'center',
            margin: 10,
          }}
        />
        <Block animated row center middle flex={false}>
          <Text weight="bold">LOOK FOR DRINKS</Text>
          <Icon
            fontFamily="MaterialIcons"
            name="star"
            size={18}
            color="primary"
          />
        </Block>
        <Input
          id="name_id"
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          ref={passwordRef}
          id="password_id"
          placeholder="Your password"
          isSecure
          value={password}
          onChangeText={setPassword}
        />
        <Button submiting={submiting} onPress={handleSubmit}>
          LETS GO
        </Button>
      </ThemeProvider>
    </Block>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: getTheme('sceneSpacing'),
  },
});

export default codePush(codePushOptions)(App);
