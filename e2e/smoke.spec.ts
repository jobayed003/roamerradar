import { expect, test } from '@playwright/test';

test('support page is public and renders help content', async ({ page }) => {
  await page.goto('/support');
  await expect(page.getByRole('heading', { name: 'Support', exact: true })).toBeVisible();
  await expect(page.getByText('Frequently asked questions')).toBeVisible();
  await expect(page.getByRole('link', { name: /Email support/i })).toBeVisible();
});

test('login page renders credentials form', async ({ page }) => {
  await page.goto('/auth/login');
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
  await expect(page.getByText(/email address/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});
