import { expect, test } from '@playwright/test';

test.describe('Behavioral Tests', () => {
  test('Add a new user', async ({ page }) => {
    await page.goto('/dashboard');

    await page.fill('[data-testid="user-name-input"]', 'John Doe');
    await page.fill('[data-testid="user-email-input"]', 'john@example.com');
    await page.selectOption('[data-testid="user-role-select"]', 'admin');
    
    await page.click('[data-testid="add-user-button"]');

    const userRow = await page.locator('[data-testid="user-row-1"]');
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText('John Doe');
    await expect(userRow).toContainText('john@example.com');
    await expect(userRow).toContainText('Admin');
  });
}); 