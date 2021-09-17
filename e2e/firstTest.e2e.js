describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('must check if the fields are required', async () => {
    await element(by.text('LETS GO')).tap();
    await expect(element(by.text('LETS GO'))).toBeVisible();
  });

  test('should validate the fields', async () => {
    await element(by.id('name_id')).typeText('Marlon');
    await element(by.id('password_id')).typeText('123');

    await element(by.text('LETS GO')).tap();
    await expect(element(by.text('LETS GO'))).toBeVisible();
  });

  test('should login successfully', async () => {
    await element(by.id('name_id')).typeText('Marlon');
    await element(by.id('password_id')).typeText('123456');

    await element(by.text('LETS GO')).tap();
    await expect(element(by.text('LETS GO'))).toNotExist();
  });
});
