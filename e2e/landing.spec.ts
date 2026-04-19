import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
  test('loads and shows hero headline', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/StadiumIQ/i);
    // Hero badge should be visible
    await expect(page.locator('.hero-badge')).toBeVisible();
  });

  test('navbar becomes opaque on scroll', async ({ page }) => {
    await page.goto('/');

    // Initially not scrolled
    const nav = page.locator('.nav');
    await expect(nav).not.toHaveClass(/scrolled/);

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(400);

    await expect(nav).toHaveClass(/scrolled/);
  });

  test('CTA "Get Started" button navigates to login', async ({ page }) => {
    await page.goto('/');
    // Click the first primary CTA button
    await page.click('a[href="/login"]', { strict: false });
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('skip link is focusable and skips to main content', async ({ page }) => {
    await page.goto('/');
    // Tab once to focus the skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toBeFocused();

    // Activate it
    await page.keyboard.press('Enter');
    // Main content should now be focused
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('features section reveals on scroll', async ({ page }) => {
    await page.goto('/');
    // Scroll to features
    await page.evaluate(() => {
      document.querySelector('.feats-s')?.scrollIntoView();
    });
    await page.waitForTimeout(700);
    // At least one reveal element should become visible
    const visible = await page.locator('.reveal.visible').count();
    expect(visible).toBeGreaterThan(0);
  });
});
