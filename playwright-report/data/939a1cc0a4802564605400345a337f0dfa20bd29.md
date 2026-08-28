# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart-checkout.spec.ts >> Cart & Checkout >> checkout requires all fields to be filled
- Location: tests\cart-checkout.spec.ts:51:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]: standard_user
      - textbox "Password" [active] [ref=e13]: secret_sauce
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { InventoryPage } from '../pages/InventoryPage';
  4  | import { CartPage } from '../pages/CartPage';
  5  | import { CheckoutPage } from '../pages/CheckoutPage';
  6  | import { users, products, checkoutInfo } from '../fixtures/test-data';
  7  | 
  8  | test.describe('Cart & Checkout', () => {
> 9  |   test.beforeEach(async ({ page }) => {
     |        ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  10 |     const loginPage = new LoginPage(page);
  11 |     await loginPage.goto();
  12 |     await loginPage.login(users.standard.username, users.standard.password);
  13 |   });
  14 | 
  15 |   test('added items appear correctly in the cart', async ({ page }) => {
  16 |     const inventoryPage = new InventoryPage(page);
  17 |     const cartPage = new CartPage(page);
  18 | 
  19 |     await inventoryPage.addItemToCartByName(products.backpack);
  20 |     await inventoryPage.addItemToCartByName(products.bikeLight);
  21 |     await inventoryPage.goToCart();
  22 | 
  23 |     await cartPage.expectLoaded();
  24 |     await cartPage.expectItemCount(2);
  25 |     await cartPage.expectItemInCart(products.backpack);
  26 |     await cartPage.expectItemInCart(products.bikeLight);
  27 |   });
  28 | 
  29 |   test('full checkout flow completes an order end to end', async ({ page }) => {
  30 |     const inventoryPage = new InventoryPage(page);
  31 |     const cartPage = new CartPage(page);
  32 |     const checkoutPage = new CheckoutPage(page);
  33 | 
  34 |     await inventoryPage.addItemToCartByName(products.backpack);
  35 |     await inventoryPage.addItemToCartByName(products.boltTShirt);
  36 |     await inventoryPage.goToCart();
  37 | 
  38 |     await cartPage.expectLoaded();
  39 |     await cartPage.proceedToCheckout();
  40 | 
  41 |     await checkoutPage.fillInfo(
  42 |       checkoutInfo.firstName,
  43 |       checkoutInfo.lastName,
  44 |       checkoutInfo.postalCode
  45 |     );
  46 |     await checkoutPage.expectTotalsMatch();
  47 |     await checkoutPage.finishOrder();
  48 |     await checkoutPage.expectOrderComplete();
  49 |   });
  50 | 
  51 |   test('checkout requires all fields to be filled', async ({ page }) => {
  52 |     const inventoryPage = new InventoryPage(page);
  53 |     const cartPage = new CartPage(page);
  54 |     const checkoutPage = new CheckoutPage(page);
  55 | 
  56 |     await inventoryPage.addItemToCartByName(products.backpack);
  57 |     await inventoryPage.goToCart();
  58 |     await cartPage.proceedToCheckout();
  59 | 
  60 |     await checkoutPage.fillInfo('', '', '');
  61 |     await checkoutPage.errorMessage.waitFor({ state: 'visible' });
  62 |   });
  63 | });
  64 | 
```