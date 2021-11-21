describe('Permission flow', () => {
  test('should show the list of breweries cards', async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        location: 'always',
      },
    });

    await waitFor(element(by.text('LETS GO'))).toExist();

    await element(by.text('LETS GO')).tap();

    await waitFor(element(by.text('LETS GO'))).not.toExist();

    await waitFor(element(by.id('mapCardList_id'))).toBeVisible();
  });

  test('should not show brewery card list', async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        location: 'never',
      },
    });

    await waitFor(element(by.text('LETS GO'))).toExist();

    await element(by.text('LETS GO')).tap();

    await waitFor(element(by.text('LETS GO'))).not.toExist();

    await waitFor(element(by.id('mapCardList_id'))).not.toBeVisible();
  });
});
