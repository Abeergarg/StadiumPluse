import { test, expect } from '@playwright/test';

test('Login flow with Demo OTP', async ({ page }) => {
  await page.goto('/login');
  
  // Step 1: Ticket Details
  await page.fill('input[id="ticket-id"]', 'TKT-2026');
  await page.fill('input[id="fan-name"]', 'John Doe');
  await page.fill('input[id="phone"]', '9876543210');
  
  // Click Send OTP
  await page.click('button:has-text("Send OTP")');
  
  // Check if banner says OTP sent
  await expect(page.locator('text=OTP sent!')).toBeVisible();

  // Wait for OTP boxes to appear
  await expect(page.locator('h2:has-text("Verify Your Number")')).toBeVisible();

  // Get generated OTP text from page
  const demoOtpText = await page.locator('text=DEMO OTP:').innerText();
  const match = demoOtpText.match(/DEMO OTP:\s+(\d{6})/);
  if (!match) {
    throw new Error('Demo OTP not found');
  }
  const otp = match[1];

  // Fill in the OTP
  const otpInputs = page.locator('.otp-box');
  for (let i = 0; i < 6; i++) {
    await otpInputs.nth(i).fill(otp[i]);
  }

  // Click verify
  await page.click('button:has-text("Verify & Enter Stadium")');

  // Expect Success Step
  await expect(page.locator('h2:has-text("You\'re in!")')).toBeVisible({ timeout: 5000 });

  // Wait for redirect to dashboard
  await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
});
