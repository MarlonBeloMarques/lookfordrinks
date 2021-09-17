import { FormValidator } from '~/utils';

const validateLength = (value: string | null | undefined): boolean =>
  (value && value.length >= 6) || false;

export const validationSchema = FormValidator.object().shape({
  password: FormValidator.string()
    .test('length', 'Password must contain at least 6 digits', validateLength)
    .required('Required password'),
  name: FormValidator.string().required('Required name'),
});

export type FormValues = {
  name: string;
  password: string;
};

export const initialValues = {
  name: '',
  password: '',
};
