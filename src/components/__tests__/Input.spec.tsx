import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Input from '../Input';
import { renderWithTheme } from './helpers/renderWithTheme';

describe('Components: Input', () => {
  test('should call the function when called', () => {
    // given
    const valueMock = '';
    const onChangeMock = jest.fn();

    const rendered = renderWithTheme(
      <Input id={'input_id'} value={valueMock} onChangeText={onChangeMock} />,
    );
    // when
    fireEvent.changeText(rendered.getByTestId('input_id'), onChangeMock);
    // then
    expect(onChangeMock).toHaveBeenCalled();
  });
});
