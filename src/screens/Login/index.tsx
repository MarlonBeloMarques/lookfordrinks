import React, { FC, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import Login from './Login';

const LoginContainer: FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submiting, setSubmiting] = useState(false);

  const passwordRef = useRef<TextInput>();

  const handleSubmit = () => {
    setSubmiting(true);
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

export default LoginContainer;
