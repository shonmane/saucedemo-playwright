# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory >> cart badge reflects multiple items
- Location: tests\inventory.spec.ts:23:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic:
          - generic:
            - generic [ref=e7]:
              - button "Open Menu" [ref=e8] [cursor=pointer]
              - img "Open Menu" [ref=e9]
            - generic [ref=e10]:
              - navigation [ref=e12]:
                - link [ref=e13] [cursor=pointer]:
                  - /url: "#"
                  - text: All Items
                - link [ref=e14] [cursor=pointer]:
                  - /url: https://saucelabs.com/
                  - text: About
                - link [ref=e15] [cursor=pointer]:
                  - /url: "#"
                  - text: Logout
                - link [ref=e16] [cursor=pointer]:
                  - /url: "#"
                  - text: Reset App State
              - button [ref=e18] [cursor=pointer]: Close Menu
        - generic [ref=e20]: Swag Labs
      - generic [ref=e24]:
        - generic [ref=e25]: Products
        - generic [ref=e27] [cursor=pointer]:
          - generic [ref=e28]: Name (A to Z)
          - combobox [ref=e29]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e33]:
      - generic [ref=e34]:
        - link [ref=e36] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e37]
        - generic [ref=e38]:
          - generic [ref=e39]:
            - link "Sauce Labs Backpack" [ref=e40] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e42]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e43]:
            - generic [ref=e44]: $29.99
            - button "Add to cart" [ref=e45] [cursor=pointer]
      - generic [ref=e46]:
        - link [ref=e48] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e49]
        - generic [ref=e50]:
          - generic [ref=e51]:
            - link "Sauce Labs Bike Light" [ref=e52] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e54]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e55]:
            - generic [ref=e56]: $9.99
            - button "Add to cart" [ref=e57] [cursor=pointer]
      - generic [ref=e58]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e60] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt"
        - generic [ref=e61]:
          - generic [ref=e62]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e63] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e65]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e66]:
            - generic [ref=e67]: $15.99
            - button "Add to cart" [ref=e68] [cursor=pointer]
      - generic [ref=e69]:
        - link [ref=e71] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e72]
        - generic [ref=e73]:
          - generic [ref=e74]:
            - link "Sauce Labs Fleece Jacket" [ref=e75] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e77]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e78]:
            - generic [ref=e79]: $49.99
            - button "Add to cart" [ref=e80] [cursor=pointer]
      - generic [ref=e81]:
        - link "Sauce Labs Onesie" [ref=e83] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie"
        - generic [ref=e84]:
          - generic [ref=e85]:
            - link "Sauce Labs Onesie" [ref=e86] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e88]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e89]:
            - generic [ref=e90]: $7.99
            - button "Add to cart" [ref=e91] [cursor=pointer]
      - generic [ref=e92]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e94] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)"
        - generic [ref=e95]:
          - generic [ref=e96]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e97] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e99]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e100]:
            - generic [ref=e101]: $15.99
            - button "Add to cart" [ref=e102] [cursor=pointer]
  - contentinfo [ref=e103]:
    - list [ref=e104]:
      - listitem [ref=e105]:
        - link "Twitter" [ref=e106] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e107]:
        - link "Facebook" [ref=e108] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e109]:
        - link "LinkedIn" [ref=e110] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e111]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { InventoryPage } from '../pages/InventoryPage';
  4  | import { users, products } from '../fixtures/test-data';
  5  | 
  6  | test.describe('Inventory', () => {
> 7  |   test.beforeEach(async ({ page }) => {
     |        ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  8  |     const loginPage = new LoginPage(page);
  9  |     await loginPage.goto();
  10 |     await loginPage.login(users.standard.username, users.standard.password);
  11 |   });
  12 | 
  13 |   test('can add and remove an item from the cart', async ({ page }) => {
  14 |     const inventoryPage = new InventoryPage(page);
  15 | 
  16 |     await inventoryPage.addItemToCartByName(products.backpack);
  17 |     expect(await inventoryPage.getCartCount()).toBe(1);
  18 | 
  19 |     await inventoryPage.removeItemFromCartByName(products.backpack);
  20 |     expect(await inventoryPage.getCartCount()).toBe(0);
  21 |   });
  22 | 
  23 |   test('cart badge reflects multiple items', async ({ page }) => {
  24 |     const inventoryPage = new InventoryPage(page);
  25 | 
  26 |     await inventoryPage.addItemToCartByName(products.backpack);
  27 |     await inventoryPage.addItemToCartByName(products.bikeLight);
  28 |     await inventoryPage.addItemToCartByName(products.boltTShirt);
  29 | 
  30 |     expect(await inventoryPage.getCartCount()).toBe(3);
  31 |   });
  32 | 
  33 |   test('sorting by price low to high orders items correctly', async ({ page }) => {
  34 |     const inventoryPage = new InventoryPage(page);
  35 | 
  36 |     await inventoryPage.sortBy('lohi');
  37 |     const prices = await inventoryPage.getDisplayedPrices();
  38 |     const sorted = [...prices].sort((a, b) => a - b);
  39 | 
  40 |     expect(prices).toEqual(sorted);
  41 |   });
  42 | 
  43 |   test('sorting by price high to low orders items correctly', async ({ page }) => {
  44 |     const inventoryPage = new InventoryPage(page);
  45 | 
  46 |     await inventoryPage.sortBy('hilo');
  47 |     const prices = await inventoryPage.getDisplayedPrices();
  48 |     const sorted = [...prices].sort((a, b) => b - a);
  49 | 
  50 |     expect(prices).toEqual(sorted);
  51 |   });
  52 | });
  53 | 
```