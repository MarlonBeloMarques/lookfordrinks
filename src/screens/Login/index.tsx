import React, { FC, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import { FormikHelpers } from 'formik';
import { TextInput } from 'react-native';
import { UserStore } from '~/stores';
import { FormikBehavior, useAlerts } from '~/utils';
import Login from './Login';
import { FormValues, initialValues, validationSchema } from './form';

type Props = {
  user: UserStore;
};

const LoginContainer: FC<Props> = ({ user }) => {
  const { showError } = useAlerts();

  const passwordRef = useRef<TextInput>();

  const submit = async (
    values: FormValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true);
    try {
      await user.login(values);
    } catch (error) {
      showError('message error');
    }
  };

  const onSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    submit(values, setSubmitting);
  };

  return (
    <FormikBehavior
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Login passwordRef={passwordRef} />
    </FormikBehavior>
  );
};

export default inject('user')(observer(LoginContainer));
