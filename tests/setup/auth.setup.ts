import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { STORAGE_STATE } from '../../config/env';
import users from '../../test-data/users.json';

// Runs once before the UI projects and saves cookies to .auth/,
// so every UI test starts already logged in.
setup('log in as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(inventoryPage.title).toHaveText('Products');

  await page.context().storageState({ path: STORAGE_STATE });
});
