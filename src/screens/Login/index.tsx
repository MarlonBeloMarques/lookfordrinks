import React, { FC, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { TextInput } from 'react-native';
import { UserStore } from '~/stores';
import { useAlerts } from '~/utils';
import Login from './Login';

type Props = {
  user: UserStore;
};

const LoginContainer: FC<Props> = ({ user }) => {
  const { showError } = useAlerts();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submiting, setSubmiting] = useState(false);

  const passwordRef = useRef<TextInput>();

  const handleSubmit = async () => {
    try {
      setSubmiting(true);
      await user.login({ name, password });
    } catch (error) {
      showError('message error');
    }
  };

  return (
    <Login
      name={name}
      password={password}
      setName={setName}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      submiting={submiting}
      passwordRef={passwordRef}
    />
  );
};

export default inject('user')(observer(LoginContainer));
