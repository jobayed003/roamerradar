import { expect, test } from '@playwright/test';

test('stays location typeahead shows matching place suggestions', async ({ page }) => {
  await page.goto('/');

  const locationInput = page.getByPlaceholder('Location');
  await expect(locationInput).toBeVisible({ timeout: 20_000 });
  await locationInput.click();
  await locationInput.fill('');
  await locationInput.pressSequentially('Eiffel', { delay: 40 });

  await expect(page.getByText('Eiffel Tower', { exact: true })).toBeVisible({
    timeout: 10_000,
  });
});
