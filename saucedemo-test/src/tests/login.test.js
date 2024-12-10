const { test, expect } = require("@playwright/test");

// Test Case 1: Verify User Login
test("Verify User Login", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  const logoText = await page.locator(".app_logo").textContent();
  expect(logoText).toBe("Swag Labs");
});

// Test Case 2: Verify Adding Item to Cart
test("Verify Adding Item to Cart", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartBadge = await page.locator(".shopping_cart_badge").textContent();
  expect(cartBadge).toBe("1");
  await page.click(".shopping_cart_link");
  const cartItems = await page.locator(".cart_item");
  expect(await cartItems.count()).toBe(1);
  const itemText = await cartItems
    .locator(".inventory_item_name")
    .textContent();
  expect(itemText).toBe("Sauce Labs Backpack");
});

// Test Case 3: Verify Adding Multiple Items to Cart
test("Verify Adding Multiple Items to Cart", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  let cartBadge = await page.locator(".shopping_cart_badge").textContent();
  expect(cartBadge).toBe("1");
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  cartBadge = await page.locator(".shopping_cart_badge").textContent();
  expect(cartBadge).toBe("2");
  await page.click(".shopping_cart_link");
  const cartItems = await page.locator(".cart_item");
  expect(await cartItems.count()).toBe(2);
  const itemNames = await cartItems
    .locator(".inventory_item_name")
    .allTextContents();
  expect(itemNames).toContain("Sauce Labs Backpack");
  expect(itemNames).toContain("Sauce Labs Bike Light");
});

// Test Case 4: Verify Removing Item from Cart
test("Verify Removing Item from Cart", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click(".shopping_cart_link");
  const cartItems = await page.locator(".cart_item");
  expect(await cartItems.count()).toBe(1);
  expect(await cartItems.locator(".inventory_item_name").textContent()).toBe(
    "Sauce Labs Backpack"
  );
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  expect(await cartItems.count()).toBe(0);
  const cartBadge = await page.locator(".shopping_cart_badge");
  expect(await cartBadge.isVisible()).toBeFalsy();
});

// Test Case 5: Verify Checkout Process
test("Verify Checkout Process", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click(".shopping_cart_link");
  expect(
    await page
      .locator(".cart_item")
      .locator(".inventory_item_name")
      .textContent()
  ).toBe("Sauce Labs Backpack");
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', "John");
  await page.fill('[data-test="lastName"]', "Dou");
  await page.fill('[data-test="postalCode"]', "12345");
  await page.click('[data-test="continue"]');
  const summaryTotal = await page.locator(".summary_total_label").textContent();
  expect(summaryTotal).toBe("Total: $32.39");
  await page.click('[data-test="finish"]');
  const orderComplete = await page.locator(".complete-header").textContent();
  expect(orderComplete).toBe("Thank you for your order!");
});

// Test Case 6: Verify Checkout Process for Multiple Items
test("Verify Checkout Process for Multiple Items", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click(".shopping_cart_link");
  const cartItems = await page.locator(".cart_item");
  expect(await cartItems.count()).toBe(2);
  const itemNames = await cartItems
    .locator(".inventory_item_name")
    .allTextContents();
  expect(itemNames).toContain("Sauce Labs Backpack");
  expect(itemNames).toContain("Sauce Labs Bike Light");
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', "John");
  await page.fill('[data-test="lastName"]', "Dou");
  await page.fill('[data-test="postalCode"]', "12345");
  await page.click('[data-test="continue"]');
  const summaryTotal = await page.locator(".summary_total_label").textContent();
  expect(summaryTotal).toBe("Total: $43.18");
  await page.click('[data-test="finish"]');
  const orderComplete = await page.locator(".complete-header").textContent();
  expect(orderComplete).toBe("Thank you for your order!");
});

// Test Case 7: Verify Non-Existing User Is Not Able to Login
test("Verify Non-Existing User Is Not Able to Login", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user_123");
  await page.fill("#password", "secret_sauce_123");
  await page.click("#login-button");
  const errorMessage = await page.locator('[data-test="error"]').textContent();
  expect(errorMessage).toBe(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

// Test Case 8: Verify User Is Able to Logout
test("Verify User Is Able to Logout", async ({ page }) => {
  await page.goto("/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.click("#react-burger-menu-btn");
  const burgerMenu = await page.locator(".bm-menu");
  expect(await burgerMenu.isVisible()).toBeTruthy();
  await page.click("#logout_sidebar_link");
  expect(await page.locator("#user-name").isVisible()).toBeTruthy();
  expect(await page.locator("#password").isVisible()).toBeTruthy();
  expect(await page.locator("#login-button").isVisible()).toBeTruthy();
});
