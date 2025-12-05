import { test, expect } from "@playwright/test";

test.describe("History Feature (LRU Algorithm) (H-1 ~ H-3)", () => {
  // Setup: Mock API responses for all repository detail requests
  // This prevents hitting GitHub API rate limits during testing
  test.beforeEach(async ({ page }) => {
    await page.route(/\/api\/repos\/[^/]+\/[^/]+$/, async (route) => {
      const url = route.request().url();
      const parts = url.split("/");
      const repoName = parts[parts.length - 1];
      const ownerName = parts[parts.length - 2];

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: Math.floor(Math.random() * 100000),
          name: repoName,
          full_name: `${ownerName}/${repoName}`,
          owner: {
            login: ownerName,
            avatar_url: "https://github.com/placeholder.png",
            html_url: `https://github.com/${ownerName}`,
          },
          html_url: `https://github.com/${ownerName}/${repoName}`,
          description: `Mocked description for ${repoName}`,
          stargazers_count: 100,
          forks_count: 50,
          watchers_count: 10,
          open_issues_count: 5,
          language: "TypeScript",
          updated_at: new Date().toISOString(),
          license: null,
        }),
      });
    });

    await page.route(/\/api\/repos\/.+\/readme$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/plain",
        body: "# Mock Readme Content",
      });
    });
  });

  test("H-1 & H-2: Should add items and reorder on revisit (LRU Logic)", async ({
    page,
  }) => {
    // 1. Visit "react" repository
    await page.goto("/repos/facebook/react");
    await expect(
      page.getByRole("heading", { name: "react", exact: true }).first()
    ).toBeVisible();

    // 2. Visit "next.js" repository
    await page.goto("/repos/vercel/next.js");
    await expect(
      page.getByRole("heading", { name: "next.js", exact: true }).first()
    ).toBeVisible();

    // 3. Open History Sheet
    // Locate the history button in the header (assuming it has an icon/label)
    const historyButton = page
      .getByRole("button", { name: /history/i })
      .first(); // Adjust selector if needed
    await historyButton.click();

    // Verify initial order: [next.js, react] (Newest first)
    const historyItems = page.locator("div[role='dialog'] a"); // Links inside the sheet

    await expect(historyItems).toHaveCount(2);
    await expect(historyItems.nth(0)).toContainText("next.js");
    await expect(historyItems.nth(1)).toContainText("react");

    // Close sheet (Click outside or close button)
    await page.keyboard.press("Escape");

    // --- Test Reordering (H-2) ---

    // 4. Revisit "react" (It should move to the top)
    await page.goto("/repos/facebook/react");

    // 5. Check History again
    await historyButton.click();

    // Verify new order: [react, next.js]
    // "react" should be first now because it is the "Most Recently Used"
    await expect(historyItems.nth(0)).toContainText("react");
    await expect(historyItems.nth(1)).toContainText("next.js");
  });

  test("H-3: Should limit history to 5 items (Eviction)", async ({ page }) => {
    const repos = ["one", "two", "three", "four", "five", "six"];

    // 1. Visit 6 different repositories sequentially
    for (const repo of repos) {
      await page.goto(`/repos/test-owner/${repo}`);
      // Wait for page to load to ensure it's added to history
      await expect(
        page.getByRole("heading", { name: repo, exact: true })
      ).toBeVisible();
    }

    // 2. Open History
    await page
      .getByRole("button", { name: /history/i })
      .first()
      .click();

    const historyItems = page.locator("div[role='dialog'] a");

    // 3. Assertions

    // Count should be capped at 5
    await expect(historyItems).toHaveCount(5);

    // The newest item ("six") should be at the top
    await expect(historyItems.first()).toContainText("six");

    // The oldest item ("one") should be evicted (not present)
    await expect(page.locator("div[role='dialog']")).not.toContainText(
      "test-owner/one"
    );

    // The 5th item should be "two" (since "one" was removed)
    await expect(historyItems.nth(4)).toContainText("two");
  });
});
