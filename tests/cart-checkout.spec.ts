import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, products, checkoutInfo } from '../fixtures/test-data';

test.describe('Cart & Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('added items appear correctly in the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.addItemToCartByName(products.bikeLight);
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);
    await cartPage.expectItemInCart(products.backpack);
    await cartPage.expectItemInCart(products.bikeLight);
  });

  test('full checkout flow completes an order end to end', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.addItemToCartByName(products.boltTShirt);
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.expectTotalsMatch();
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('checkout requires all fields to be filled', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCartByName(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInfo('', '', '');
    await checkoutPage.errorMessage.waitFor({ state: 'visible' });
  });
});
