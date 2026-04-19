import { test, expect } from '@playwright/test';

// Helper: complete the login flow and land on dashboard
async function loginAndEnterDashboard(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.fill('#ticket-id', 'TKT-2026');
  await page.fill('#fan-name', 'Test User');
  await page.fill('#phone', '9876543210');
  await page.click('button:has-text("Send OTP")');

  // Wait for OTP screen
  await expect(page.locator('#otp-heading')).toBeVisible();

  // Read the demo OTP from the page
  const demoText = await page.locator('text=Demo Mode: Your OTP is').textContent();
  const otp = demoText?.match(/\d{6}/)?.[0] ?? '';
  expect(otp).toHaveLength(6);

  // Fill OTP boxes
  const boxes = page.locator('.otp-box');
  for (let i = 0; i < 6; i++) {
    await boxes.nth(i).fill(otp[i]);
  }

  await page.click('button:has-text("Verify & Enter Stadium")');
  await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
}

test.describe('Dashboard — tab navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndEnterDashboard(page);
  });

  test('loads Overview tab by default', async ({ page }) => {
    await expect(page.locator('h1.db-ttl')).toContainText('Overview');
    await expect(page.locator('#db-tab-panel')).toBeVisible();
  });

  test('can navigate to Crowd tab', async ({ page }) => {
    await page.click('#tab-crowd');
    await expect(page.locator('h1.db-ttl')).toContainText('Crowd');
    await expect(page.locator('#tab-crowd')).toHaveAttribute('aria-selected', 'true');
  });

  test('can navigate to AI Assistant tab', async ({ page }) => {
    await page.click('#tab-assistant');
    await expect(page.locator('text=Stadium Assistant')).toBeVisible();
    // Send a message
    await page.fill('[aria-label="Chat input message"]', 'Hello');
    await page.click('[aria-label="Send message"]');
    await expect(page.locator('text=Hello')).toBeVisible();
  });

  test('can navigate to Food tab and add item to cart', async ({ page }) => {
    await page.click('#tab-food');
    await expect(page.locator('text=Menu · Seat M24 Delivery')).toBeVisible();

    // Add first item
    const addBtns = page.locator('[aria-label*="Add"][aria-label*="to cart"]');
    await addBtns.first().click();

    // Cart should show 1 item
    await expect(page.locator('text=Your Order (1)')).toBeVisible();
  });

  test('can navigate to Emergency tab and see SOS button', async ({ page }) => {
    await page.click('#tab-emergency');
    await expect(page.locator('text=Emergency Services')).toBeVisible();
    const sosBtn = page.locator('[aria-label*="SOS"]').first();
    await expect(sosBtn).toBeVisible();
  });

  test('can navigate to Ticket tab and see ticket details', async ({ page }) => {
    await page.click('#tab-ticket');
    await expect(page.locator('[aria-label="Digital ticket"]')).toBeVisible();
    await expect(page.locator('text=TKT-2026')).toBeVisible();
  });

  test('mobile bottom nav is present', async ({ page }) => {
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('.mob-nav')).toBeVisible();
  });

  test('keyboard: tab through sidebar nav items', async ({ page }) => {
    // Focus first sidebar tab button
    await page.locator('#tab-overview').focus();
    await page.keyboard.press('Tab');
    // Next tab button should be focused
    await expect(page.locator('#tab-crowd')).toBeFocused();
  });
});
