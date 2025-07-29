import { expect, test } from '@playwright/test';

test.describe('Behavioral Tests', () => {
  
  test.describe('Navigation', () => {
    test('Navigate from home page to dashboard', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toContainText('Devin Demo App');
      
      await page.click('text=Go to User Dashboard');
      await expect(page).toHaveURL('/dashboard');
      await expect(page.locator('h1')).toContainText('User Dashboard');
    });

    test('Navigate back from dashboard to home', async ({ page }) => {
      await page.goto('/dashboard');
      await page.click('text=← Back to Home');
      await expect(page).toHaveURL('/');
      await expect(page.locator('h1')).toContainText('Devin Demo App');
    });
  });

  test.describe('User Management - Add Users', () => {
    test('Add a new user with admin role', async ({ page }) => {
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

    test('Add a new user with moderator role', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Jane Smith');
      await page.fill('[data-testid="user-email-input"]', 'jane@example.com');
      await page.selectOption('[data-testid="user-role-select"]', 'moderator');
      
      await page.click('[data-testid="add-user-button"]');

      const userRow = await page.locator('[data-testid="user-row-1"]');
      await expect(userRow).toBeVisible();
      await expect(userRow).toContainText('Jane Smith');
      await expect(userRow).toContainText('jane@example.com');
      await expect(userRow).toContainText('Moderator');
    });

    test('Add a new user with default user role', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Bob Wilson');
      await page.fill('[data-testid="user-email-input"]', 'bob@example.com');
      
      await page.click('[data-testid="add-user-button"]');

      const userRow = await page.locator('[data-testid="user-row-1"]');
      await expect(userRow).toBeVisible();
      await expect(userRow).toContainText('Bob Wilson');
      await expect(userRow).toContainText('bob@example.com');
      await expect(userRow).toContainText('User');
    });

    test('Add multiple users and verify incremental IDs', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'User One');
      await page.fill('[data-testid="user-email-input"]', 'user1@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'User Two');
      await page.fill('[data-testid="user-email-input"]', 'user2@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="user-row-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-row-2"]')).toBeVisible();
      await expect(page.locator('text=Users (2)')).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test('Cannot add user with empty name', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="no-users-message"]')).toBeVisible();
    });

    test('Cannot add user with empty email', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Test User');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="no-users-message"]')).toBeVisible();
    });

    test('Cannot add user with whitespace-only name', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', '   ');
      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="no-users-message"]')).toBeVisible();
    });

    test('Form fields reset after successful user addition', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Test User');
      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.selectOption('[data-testid="user-role-select"]', 'admin');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="user-name-input"]')).toHaveValue('');
      await expect(page.locator('[data-testid="user-email-input"]')).toHaveValue('');
      await expect(page.locator('[data-testid="user-role-select"]')).toHaveValue('user');
    });
  });

  test.describe('User Management - Delete Users', () => {
    test('Delete a single user', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Test User');
      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="user-row-1"]')).toBeVisible();

      await page.click('[data-testid="delete-user-1"]');
      
      await page.waitForTimeout(100);
      
      const confirmButton = page.locator('text=Confirm');
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
      }

      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="no-users-message"]')).toBeVisible();
    });

    test('Delete user with confirmation flow', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Test User');
      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.click('[data-testid="delete-user-1"]');

      await expect(page.locator('text=Confirm')).toBeVisible();
      await expect(page.locator('text=Cancel')).toBeVisible();

      await page.click('text=Confirm');

      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="no-users-message"]')).toBeVisible();
    });

    test('Clear all users', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'User One');
      await page.fill('[data-testid="user-email-input"]', 'user1@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'User Two');
      await page.fill('[data-testid="user-email-input"]', 'user2@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="user-row-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-row-2"]')).toBeVisible();

      await page.click('[data-testid="clear-all-button"]');

      await expect(page.locator('[data-testid="no-users-message"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="user-row-2"]')).not.toBeVisible();
    });

    test('Clear all button only appears when users exist', async ({ page }) => {
      await page.goto('/dashboard');

      await expect(page.locator('[data-testid="clear-all-button"]')).not.toBeVisible();

      await page.fill('[data-testid="user-name-input"]', 'Test User');
      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="clear-all-button"]')).toBeVisible();
    });
  });

  test.describe('Search and Filter', () => {
    test('Search users by name', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'John Doe');
      await page.fill('[data-testid="user-email-input"]', 'john@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'Jane Smith');
      await page.fill('[data-testid="user-email-input"]', 'jane@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="search-input"]', 'John');

      await expect(page.locator('[data-testid="user-row-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-row-2"]')).not.toBeVisible();
    });

    test('Search users by email', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'John Doe');
      await page.fill('[data-testid="user-email-input"]', 'john@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'Jane Smith');
      await page.fill('[data-testid="user-email-input"]', 'jane@test.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="search-input"]', 'test.com');

      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="user-row-2"]')).toBeVisible();
    });

    test('Search users by role', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Admin User');
      await page.fill('[data-testid="user-email-input"]', 'admin@example.com');
      await page.selectOption('[data-testid="user-role-select"]', 'admin');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'Regular User');
      await page.fill('[data-testid="user-email-input"]', 'user@example.com');
      await page.selectOption('[data-testid="user-role-select"]', 'user');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="search-input"]', 'admin');

      await expect(page.locator('[data-testid="user-row-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-row-2"]')).not.toBeVisible();
    });

    test('No search results message', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Test User');
      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="search-input"]', 'nonexistent');

      await expect(page.locator('[data-testid="no-search-results"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-row-1"]')).not.toBeVisible();
    });

    test('Clear search shows all users', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'John Doe');
      await page.fill('[data-testid="user-email-input"]', 'john@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'Jane Smith');
      await page.fill('[data-testid="user-email-input"]', 'jane@example.com');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="search-input"]', 'John');
      await expect(page.locator('[data-testid="user-row-2"]')).not.toBeVisible();

      await page.fill('[data-testid="search-input"]', '');

      await expect(page.locator('[data-testid="user-row-1"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-row-2"]')).toBeVisible();
    });
  });

  test.describe('UI States and Edge Cases', () => {
    test('Empty state message displays when no users', async ({ page }) => {
      await page.goto('/dashboard');

      await expect(page.locator('[data-testid="no-users-message"]')).toBeVisible();
      await expect(page.locator('[data-testid="no-users-message"]')).toContainText('No users added yet');
    });

    test('User count updates correctly', async ({ page }) => {
      await page.goto('/dashboard');

      await expect(page.locator('text=Users (0)')).toBeVisible();

      await page.fill('[data-testid="user-name-input"]', 'User One');
      await page.fill('[data-testid="user-email-input"]', 'user1@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('text=Users (1)')).toBeVisible();

      await page.fill('[data-testid="user-name-input"]', 'User Two');
      await page.fill('[data-testid="user-email-input"]', 'user2@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('text=Users (2)')).toBeVisible();

      await page.click('[data-testid="delete-user-1"]');
      await page.click('text=Confirm');

      await expect(page.locator('text=Users (1)')).toBeVisible();
    });

    test('Role badges display with correct styling', async ({ page }) => {
      await page.goto('/dashboard');

      await page.fill('[data-testid="user-name-input"]', 'Admin User');
      await page.fill('[data-testid="user-email-input"]', 'admin@example.com');
      await page.selectOption('[data-testid="user-role-select"]', 'admin');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'Mod User');
      await page.fill('[data-testid="user-email-input"]', 'mod@example.com');
      await page.selectOption('[data-testid="user-role-select"]', 'moderator');
      await page.click('[data-testid="add-user-button"]');

      await page.fill('[data-testid="user-name-input"]', 'Regular User');
      await page.fill('[data-testid="user-email-input"]', 'user@example.com');
      await page.selectOption('[data-testid="user-role-select"]', 'user');
      await page.click('[data-testid="add-user-button"]');

      const adminRow = page.locator('[data-testid="user-row-1"]');
      const modRow = page.locator('[data-testid="user-row-2"]');
      const userRow = page.locator('[data-testid="user-row-3"]');

      await expect(adminRow).toContainText('Admin');
      await expect(modRow).toContainText('Moderator');
      await expect(userRow).toContainText('User');
    });

    test('Search input only appears when users exist', async ({ page }) => {
      await page.goto('/dashboard');

      await expect(page.locator('[data-testid="search-input"]')).not.toBeVisible();

      await page.fill('[data-testid="user-name-input"]', 'Test User');
      await page.fill('[data-testid="user-email-input"]', 'test@example.com');
      await page.click('[data-testid="add-user-button"]');

      await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
    });
  });
});         