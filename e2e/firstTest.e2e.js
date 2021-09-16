describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('should login successfully', async () => {
    await element(by.id('name_id')).typeText('marlon.belohd@example.com');
    await element(by.id('password_id')).typeText('123456');
    await element(by.text('LETS GO')).tap();
    await expect(element(by.text('LETS GO'))).toNotExist();
  });
});
