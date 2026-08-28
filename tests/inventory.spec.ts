import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users, products } from '../fixtures/test-data';

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('can add and remove an item from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCartByName(products.backpack);
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.removeItemFromCartByName(products.backpack);
    expect(await inventoryPage.getCartCount()).toBe(0);
  });

  test('cart badge reflects multiple items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.addItemToCartByName(products.bikeLight);
    await inventoryPage.addItemToCartByName(products.boltTShirt);

    expect(await inventoryPage.getCartCount()).toBe(3);
  });

  test('sorting by price low to high orders items correctly', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getDisplayedPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('sorting by price high to low orders items correctly', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getDisplayedPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });
});
