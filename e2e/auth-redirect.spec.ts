import { expect, test } from '@playwright/test';

test('unauthenticated visits to protected routes redirect to login', async ({ page }) => {
  await page.goto('/my-bookings');
  await expect(page).toHaveURL(/\/auth\/login/);
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
});

test('account settings requires authentication', async ({ page }) => {
  await page.goto('/account-settings');
  await expect(page).toHaveURL(/\/auth\/login/);
});
