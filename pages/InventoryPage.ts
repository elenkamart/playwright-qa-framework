import { type Locator, type Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly prices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.prices = page.getByTestId('inventory-item-price');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  // slug example: 'sauce-labs-backpack'
  async addToCart(slug: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(slug: string): Promise<void> {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.prices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async getNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
