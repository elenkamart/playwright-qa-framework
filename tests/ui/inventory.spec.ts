import { test, expect } from '../../fixtures';

test.describe('Inventory', () => {
  test('shows all products @smoke', async ({ loggedInInventory }) => {
    await expect(loggedInInventory.items).toHaveCount(6);
  });

  test('sorts products by price low to high @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('lohi');
    const prices = await loggedInInventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts products by price high to low @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('hilo');
    const prices = await loggedInInventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sorts products by name Z to A @regression', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('za');
    const names = await loggedInInventory.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });
});
