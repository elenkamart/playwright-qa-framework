import { test, expect } from '../../fixtures';

// Network interception with page.route: the page must stay usable
// even when product images fail to load (e.g. CDN outage).
test.describe('Resilience', () => {
  test('products still render and can be bought when images fail @regression', async ({ page, inventoryPage }) => {
    const blocked: string[] = [];
    await page.route(/\.(png|jpe?g|svg|webp)$/, (route) => {
      blocked.push(route.request().url());
      return route.abort();
    });

    await inventoryPage.goto();

    await expect(inventoryPage.items).toHaveCount(6);
    expect(blocked.length).toBeGreaterThan(0);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
