import React, { FC, MutableRefObject } from 'react';
import { FormikProps, useFormikContext } from 'formik';
import { StyleSheet, TextInput } from 'react-native';
import { Block, Button, Icon, Image, Input, Text } from '~/components';
import { getTheme } from '~/utils';
import { FormValues } from './form';

type Props = {
  passwordRef: MutableRefObject<TextInput | undefined>;
};

const Login: FC<Props> = ({ passwordRef }) => {
  const {
    submitForm,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
  }: FormikProps<FormValues> = useFormikContext();

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
        value={values.name}
        error={touched?.name && errors?.name}
        onChangeText={handleChange('name')}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <Input
        ref={passwordRef}
        id="password_id"
        placeholder="Your password"
        isSecure
        value={values.password}
        error={touched?.password && errors?.password}
        onChangeText={handleChange('password')}
        onSubmitEditing={submitForm}
      />
      <Button submiting={isSubmitting} onPress={submitForm}>
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
