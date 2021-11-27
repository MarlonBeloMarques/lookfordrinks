describe('Welcome flow', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        location: 'always',
      },
    });
  });

  test('should click the button and show transition animation', async () => {
    await waitFor(element(by.text('LETS GO'))).toBeVisible()

    await element(by.text('LETS GO')).tap();

    await waitFor(element(by.text('LETS GO'))).not.toBeVisible();
  });
});
