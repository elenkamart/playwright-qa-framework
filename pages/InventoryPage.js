class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.prices = page.getByTestId('inventory-item-price');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  // slug example: 'sauce-labs-backpack'
  async addToCart(slug) {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(slug) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  // value: 'az' | 'za' | 'lohi' | 'hilo'
  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async getPrices() {
    const texts = await this.prices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
