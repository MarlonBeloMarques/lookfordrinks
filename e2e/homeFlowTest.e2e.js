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

    await waitFor(element(by.id('marker_id')))
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
});
