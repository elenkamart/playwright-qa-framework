const { test, expect, users } = require('../../fixtures');

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

  test('missing first name shows an error @regression', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ ...users.checkoutInfo, firstName: '' });
    await expect(checkoutPage.error).toContainText('First Name is required');
  });
});
