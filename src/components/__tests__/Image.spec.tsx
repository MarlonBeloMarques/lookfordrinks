import React from 'react';
import Image from '../Image';
import { renderWithTheme } from './helpers/renderWithTheme';

describe('Components: Input', () => {
  test('correctly uses the source string url', async () => {
    const sourceMock =
      'https://www.petlove.com.br/images/products/208498/product/Cerveja_Dog_Beer_sem_%C3%81lcool_Sabor_Carne_para_C%C3%A3es_-_335_mL_2319540.jpg?1627668387';

    const rendered = await renderWithTheme(
      <Image id="image_id" source={sourceMock} />,
    );

    const image = rendered.getByTestId('image_id');

    expect(image.props.source).toStrictEqual({ uri: sourceMock });
  });

  test('correctly uses the source image', async () => {
    const { Beer } = require('~/assets/images');
    const sourceMock = Beer;

    const rendered = await renderWithTheme(
      <Image id="image_id" source={sourceMock} />,
    );

    const image = rendered.getByTestId('image_id');

    expect(image.props.source).toStrictEqual(sourceMock);
  });
});
