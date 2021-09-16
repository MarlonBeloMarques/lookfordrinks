import React, { Dispatch, FC, MutableRefObject, SetStateAction } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Block, Button, Icon, Image, Input, Text } from '~/components';
import { getTheme } from '~/utils';

type Props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordRef: MutableRefObject<TextInput | undefined>;
  submiting: boolean;
  handleSubmit: () => void;
};

const Login: FC<Props> = ({
  name,
  setName,
  password,
  setPassword,
  passwordRef,
  submiting,
  handleSubmit,
}) => {
  return (
    <Block middle style={styles.view}>
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
    </Block>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: getTheme('sceneSpacing'),
  },
});

export default Login;
