import { test, expect } from "@playwright/test";

test.describe("Favorites Feature (F-1 ~ F-3)", () => {
  
  // Setup: Mock API responses (Set up mocks before each test run)
  test.beforeEach(async ({ page }) => {
    // Mock the repository detail data (data must pass Zod validation)
    await page.route(/\/api\/repos\/facebook\/react$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          name: "react",
          full_name: "facebook/react",
          owner: {
            login: "facebook",
            avatar_url: "https://github.com/placeholder.png",
            html_url: "https://github.com/facebook",
          },
          html_url: "https://github.com/facebook/react",
          description: "Mocked React Description",
          stargazers_count: 200000,
          forks_count: 40000,
          watchers_count: 6000,
          open_issues_count: 500,
          language: "JavaScript",
          updated_at: new Date().toISOString(),
          license: { name: "MIT" },
        }),
      });
    });

    // Mock the README response (to prevent 404)
    await page.route(
      /\/api\/repos\/facebook\/react\/readme$/,
      async (route) => {
        await route.fulfill({ status: 200, body: "# Mock Readme" });
      }
    );
  });

  // F-1: Addition Verification and F-2: Persistence Verification
  test("F-1 & F-2: Should add to favorites and persist after reload", async ({
    page,
  }) => {
    // 1. Navigate to the detail page
    await page.goto("/repos/facebook/react");

    // 2. Initial state verification (Assert 'Add' button is visible)
    const favButton = page.getByRole("button", { name: /add to favorites/i });
    await expect(favButton).toBeVisible();

    // Locate the header favorite icon (the parent element for the badge)
    const headerFavButton = page.getByLabel("Favorites"); 
    await expect(headerFavButton).toBeVisible();
    
    // --- Action: Add to Favorites ---
    await favButton.click();

    // 3. Verify State Change (F-1)
    // Assert button text changes to 'Favorited' (Optimistic UI update)
    await expect(
      page.getByRole("button", { name: /favorited/i })
    ).toBeVisible();

    // Assert the badge is visible on the header icon
    const badge = headerFavButton.locator("span"); 
    await expect(badge).toBeVisible();

    // --- Action: Reload (F-2: Persistence Test) ---
    await page.reload();

    // 4. Persistence Verification
    // Assert 'Favorited' state remains after reload
    await expect(
      page.getByRole("button", { name: /favorited/i })
    ).toBeVisible();
    // Assert the header badge is also preserved
    await expect(headerFavButton.locator("span")).toBeVisible();
  });

  // F-3: Removal verification via Favorites Sheet
  test("F-3: Should remove item via Favorites Sheet and sync state", async ({
    page,
  }) => {
    // Precondition: Ensure the item is favorited before starting the removal test
    await page.goto("/repos/facebook/react");
    await page.getByRole("button", { name: /add to favorites/i }).click();

    // 1. Click the header Favorites button to open the Sheet/Drawer
    await page.getByLabel("Favorites").click();

    // 2. Verify the repository is displayed in the Sheet
    const sheet = page.locator("div[role='dialog']");
    await expect(sheet).toBeVisible();
    // Assert presence of the repository content
    await expect(sheet).toContainText("react");
    await expect(sheet).toContainText("facebook");

    // 3. Locate and click the individual delete button (Trash icon)
    const deleteButton = sheet
      .getByRole("button")
      .filter({ has: page.locator("svg.lucide-trash-2") }) // Filter for the trash icon SVG
      .first(); 
      
    await deleteButton.click();

    // 4. Verification of removal (List state sync)
    // Assert the "No favorites yet" message appears
    await expect(sheet).toContainText("No favorites yet");

    // Close the sheet (Escape key)
    await page.keyboard.press("Escape");

    // Verification: Detail page button should revert to "Add to Favorites"
    // This confirms state synchronization (Zustand)
    await expect(
      page.getByRole("button", { name: /add to favorites/i })
    ).toBeVisible();
  });
});