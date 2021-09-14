import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import Button from '../Button';
import { renderWithTheme } from './helpers/renderWithTheme';

describe('Components: Button', () => {
  test('must find the text passed as child', () => {
    // given
    const onEventMock = jest.fn();
    const children = 'Click';
    const rendered = renderWithTheme(
      <Button onPress={onEventMock}>{children}</Button>,
    );
    // when
    const response = rendered.getByText(children);
    // then
    expect(response).toBeTruthy();
  });

  test('should run loading animation if submit is true', () => {
    // given
    const onEventMock = jest.fn();
    const rendered = renderWithTheme(
      <Button submiting onPress={onEventMock}>
        Click
      </Button>,
    );
    // when
    const activityIndicatorRendered =
      rendered.UNSAFE_getByType(ActivityIndicator);
    // then
    expect(activityIndicatorRendered).toBeTruthy();
  });

  test('should call the function when pressed', () => {
    // given
    const onEventMock = jest.fn();
    const rendered = renderWithTheme(
      <Button id="button" onPress={onEventMock}>
        Click
      </Button>,
    );

    // when
    const button = rendered.getByTestId('button');
    fireEvent.press(button);

    // then
    expect(onEventMock).toHaveBeenCalled();
  });
});
