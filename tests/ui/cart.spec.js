const { test, expect } = require('../../fixtures');

test.describe('Cart', () => {
  test('adding an item updates the cart badge @smoke', async ({ loggedInInventory }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await expect(loggedInInventory.cartBadge).toHaveText('1');
  });

  test('removing an item clears the cart badge @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await loggedInInventory.removeFromCart('sauce-labs-backpack');
    await expect(loggedInInventory.cartBadge).toBeHidden();
  });

  test('cart page lists the added items @regression', async ({ loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await loggedInInventory.addToCart('sauce-labs-bike-light');
    await loggedInInventory.openCart();
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemNames).toContainText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });
});
