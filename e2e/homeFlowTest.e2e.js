describe('Home flow', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        location: 'always',
      },
    });
  });

  test('must find a brewery on success when searching', async () => {
    await waitFor(element(by.text('LETS GO'))).toBeVisible();

    await element(by.text('LETS GO')).tap();

    await waitFor(element(by.text('LETS GO'))).not.toBeVisible();

    await waitFor(element(by.id('search_id')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('search_id')).typeText('Brazil');

    await waitFor(element(by.id('marker_0_id')))
      .toBeVisible()
      .withTimeout(5000);
  });

  test('should not find a brewery in case of exception when searching', async () => {
    await expect(element(by.id('search_id'))).toBeVisible();
    
    await element(by.id('search_id')).clearText();
    await element(by.id('search_id')).typeText('Tchu tchu ca');

    await waitFor(element(by.text('Not found breweries')))
      .toBeVisible()
      .withTimeout(5000);
  });

  test('must scroll the map card', async () => {
    await expect(element(by.id('search_id'))).toBeVisible();

    await element(by.id('search_id')).clearText();
    await element(by.id('search_id')).typeText('Burger');

    await waitFor(element(by.id('marker_0_id')))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id('mapCardList_id'))).toBeVisible();

    await element(by.id('mapCardList_id')).scroll(400, 'right');

    await waitFor(element(by.id('marker_1_id')))
      .toBeVisible()
      .withTimeout(1000);
  });
});
