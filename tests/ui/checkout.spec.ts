import { test, expect, users } from '../../fixtures';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await loggedInInventory.openCart();
    await cartPage.startCheckout();
  });

  test('user can complete an order @smoke', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(users.checkoutInfo);
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  const requiredFields = [
    { field: 'firstName', message: 'First Name is required' },
    { field: 'lastName', message: 'Last Name is required' },
    { field: 'postalCode', message: 'Postal Code is required' },
  ] as const;

  // Data-driven: one test per required field.
  for (const { field, message } of requiredFields) {
    test(`missing ${field} shows an error @regression`, async ({ checkoutPage }) => {
      await checkoutPage.fillInfo({ ...users.checkoutInfo, [field]: '' });
      await expect(checkoutPage.error).toContainText(message);
    });
  }
});
