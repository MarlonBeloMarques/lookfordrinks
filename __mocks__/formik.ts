jest.mock('formik', () => {
  const originFormik = jest.requireActual('formik');
  const useFormikContext = jest.fn().mockReturnValue({
    handleChange: () => jest.fn(),
    submitForm: () => jest.fn(),
  });
  return {
    ...originFormik,
    useFormikContext,
  };
});
