import { expect, test } from '@playwright/test';

const email = process.env.E2E_USER_EMAIL;
const password = process.env.E2E_USER_PASSWORD;

test.describe('authenticated notification preferences', () => {
  test.skip(!email || !password, 'Set E2E_USER_EMAIL and E2E_USER_PASSWORD to run');

  test('notification email toggle persists after reload', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByPlaceholder('john.doe@example.com').fill(email!);
    await page.locator('input[type="password"]').fill(password!);
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page).not.toHaveURL(/\/auth\/login/, { timeout: 20_000 });

    await page.goto('/account-settings');
    await expect(page.getByText(/notifications/i).first()).toBeVisible({ timeout: 15_000 });

    const messageEmail = page.getByRole('switch').first();
    const before = await messageEmail.getAttribute('data-state');
    await messageEmail.click();
    await expect(messageEmail).not.toHaveAttribute('data-state', before ?? '', { timeout: 10_000 });

    await page.reload();
    await expect(page.getByRole('switch').first()).toHaveAttribute(
      'data-state',
      before === 'checked' ? 'unchecked' : 'checked',
      { timeout: 15_000 }
    );

    // Restore prior preference so repeated runs stay stable
    await page.getByRole('switch').first().click();
  });
});
