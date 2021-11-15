import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Search from '../Search';

describe('Components: Search', () => {
  test('should call the function when called', () => {
    // given
    const valueMock = '';
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Search value={valueMock} onChangeText={onChangeMock} />,
    );
    // when
    const responseBySearchId = getByTestId('search_id');
    fireEvent.changeText(responseBySearchId, onChangeMock);
    // then
    expect(onChangeMock).toHaveBeenCalled();
  });
});
