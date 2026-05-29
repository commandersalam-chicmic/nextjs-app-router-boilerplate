import { expect, test } from "@playwright/test";

test.describe("Authentication Flow E2E", () => {
  test("should redirect guest user to login page when accessing protected / page", async ({
    page,
  }) => {
    // Go to protected URL
    await page.goto("/");

    // Verify it redirects to the login URL
    await expect(page).toHaveURL(/.*login.*/);

    // Verify the sign-in card header is visible
    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
  });

  test("should successfully login, redirect to /, and log out back to login screen", async ({
    page,
  }) => {
    // Navigate directly to login
    await page.goto("/login");

    // Fill form fields
    await page.fill('input[type="email"]', "demo@example.com");
    await page.fill('input[type="password"]', "N7$vQ2!mX9@Lp4#Zd8");

    // Click submit button
    await page.click('button[type="submit"]');

    await page.waitForURL("http://localhost:3000/", { timeout: 10_000 });
    await expect(page.getByRole("status")).toContainText("Just a moment");
    await expect(page.getByRole("heading", { level: 1, name: /Quiet/i })).toBeVisible({
      timeout: 12_000,
    });

    // Click the logout button
    await page.getByRole("button", { name: /sign out/i }).click();

    // Verify we are redirected back to the login page
    await expect(page).toHaveURL(/.*login.*/);
    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
  });
});
