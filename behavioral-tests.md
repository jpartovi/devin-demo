# Behavioral Testing for Devin Demo

This document describes some end-to-end testing approaches using Playwright to validate the `Devin Demo App`. These tests are focused on ensuring the correctness of user interactions and application behavior.

## Test 1: Add a New User

### Objective
Test adding a new user with a name, email, and role.

### Steps
1. Navigate to the dashboard.
2. Fill in `Name`, `Email`, and `Role`.
3. Click the `Add User` button.
4. Validate that the new user appears in the list with correct details.

### Playwright Code
```javascript
import { expect, test } from '@playwright/test';

test('Add a new user', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

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
```

## Test 2: Delete a User

### Objective
Test deleting a user from the list.

### Steps
1. Add a test user.
2. Click the `Delete` button next to the test user.
3. Validate that the user is removed from the list.

### Playwright Code
```javascript
import { expect, test } from '@playwright/test';

test('Delete a user', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  // Add a user first as set up, if needed, similar to previous test

  await page.click('[data-testid="delete-user-1"]');

  await expect(page.locator('[data-testid="user-row-1"]')).toBeHidden();
});
```

## Installation and Setup

1. Install Playwright:
   ```bash
   npm i -D @playwright/test
   ```

2. Add a test script to `package.json`:
   ```json
   "scripts": {
     "test": "playwright test"
   }
   ```

3. Run tests:
   ```bash
   npm run test
   ```
