import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

test('example test', async ({ page }) => {
  // Добавь основной код теста здесь
  await expect(page.locator('h1')).toHaveText('TodoMVC');
});


