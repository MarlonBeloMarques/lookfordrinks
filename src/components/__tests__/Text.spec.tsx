import React from 'react';
import Text from '../Text';
import { renderWithTheme } from './helpers/renderWithTheme';

describe('Components: Text', () => {
  test('must find no element the value passed as child', () => {
    // given
    const children = 'Look For Drinks';
    const rendered = renderWithTheme(<Text>{children}</Text>);
    // when
    const response = rendered.getByText(children);
    // then
    expect(response).toBeTruthy();
  });
});
