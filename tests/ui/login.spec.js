const { test, expect, users } = require('../../fixtures');

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user can log in @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('locked out user sees an error @regression', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.error).toContainText('this user has been locked out');
  });

  test('invalid credentials show an error @regression', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.error).toContainText('do not match any user');
  });

  test('empty username shows a validation error @regression', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await expect(loginPage.error).toContainText('Username is required');
  });
});
