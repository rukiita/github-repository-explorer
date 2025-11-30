import { test, expect } from "@playwright/test";

test.describe("Search Feature & URL Sync (S-1 ~ S-4)", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/github*", async (route) => {
      const url = new URL(route.request().url());
      const query = url.searchParams.get("q") || ""; 

      let items: any[] = [];

      // "react" 検索時のモックデータ
      if (query.includes("react")) {
        items = [
          {
            id: 1,
            name: "react",
            full_name: "facebook/react",
            description:
              "A declarative, efficient, and flexible JavaScript library",
            stargazers_count: 200000,
            language: "JavaScript",
            html_url: "https://github.com/facebook/react",
            owner: {
              login: "facebook",
              avatar_url: "https://example.com/avatar.png",
              html_url: "https://github.com/facebook",
            },
            updated_at: "2023-01-01T00:00:00Z",
          },
        ];
      }
    
      else if (query.includes("vue")) {
        items = [
          {
            id: 2,
            name: "vue",
            full_name: "vuejs/vue",
            description:
              "Vue.js is a progressive, incrementally-adoptable JavaScript framework.",
            stargazers_count: 150000,
            language: "JavaScript",
            html_url: "https://github.com/vuejs/vue",
            owner: {
              login: "vuejs",
              avatar_url: "https://example.com/avatar.png",
              html_url: "https://github.com/vuejs",
            },
            updated_at: "2023-01-01T00:00:00Z",
          },
        ];
      }

      else if (query.includes("javascript")) {
        items = Array.from({ length: 30 }, (_, i) => ({
          id: 100 + i,
          name: `javascript-repo-${i}`,
          full_name: `test-user/javascript-repo-${i}`,
          description: `Description for repo ${i}`,
          stargazers_count: 1000,
          language: "JavaScript",
          html_url: `https://github.com/test-user/javascript-repo-${i}`,
          owner: {
            login: "test-user",
            avatar_url: "https://example.com/avatar.png",
            html_url: "https://github.com/test-user",
          },
          updated_at: "2023-01-01T00:00:00Z",
        }));
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: items.length,
          incomplete_results: false,
          items: items,
        }),
      });
    });
  });

  // S-1: Basic search and result display
  test("S-1: Should update URL and list when searching", async ({ page }) => {
    await page.goto("/");

    // 1. Enter text in the search bar
    const searchInput = page.getByPlaceholder("Search repositories...");
    await searchInput.fill("react");

    // 2. Assert URL parameter updates after debounce
    await expect(page).toHaveURL(/\?q=react/);

    // 3. Assert the first result link is visible (waiting for data to load)
    // Using a partial attribute selector for robustness
    await expect(
      page.locator('a[href*="repos/facebook/react"]').first()
    ).toBeVisible({ timeout: 10000 });
  });

  // S-2: State restoration via direct URL access
  test("S-2: Should restore search state from URL", async ({ page }) => {
    // 1. Access the URL with a query parameter directly
    await page.goto("/?q=vue");

    // 2. Assert search input synchronizes with the URL query
    const searchInput = page.getByPlaceholder("Search repositories...");
    await expect(searchInput).toHaveValue("vue");

    // 3. Assert list displays the correct results
    await expect(
      page.getByRole("link", { name: /vue/i }).first()
    ).toBeVisible();
  });

  // S-3: State persistence after complex navigation
  test("S-3: Should restore search state after navigation", async ({
    page,
  }) => {
    // --- 1. API Mock Setup (Ensuring stability) ---
    // Mock the search API response for the 'react' query
    await page.route(/\/api\/search/, async (route) => {
      // Return fixed mock data if the URL matches the search criteria
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_count: 1,
          items: [
            {
              id: 1,
              name: "react",
              full_name: "facebook/react",
              owner: {
                login: "facebook",
                avatar_url: "https://github.com/facebook.png",
              },
              html_url: "https://github.com/facebook/react",
              description: "Mocked React",
              stargazers_count: 200000,
              forks_count: 40000,
              watchers_count: 6000,
              open_issues_count: 500,
              language: "JavaScript",
              updated_at: new Date().toISOString(),
            },
          ],
        }),
      });
    });

    // Mock the detail page API response (optional, but prevents 404/500)
    await page.route(/\/api\/repos\/facebook\/react/, async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({}) });
    });

    // --- 2. Execution and Navigation ---
    await page.goto("/");
    const searchInput = page.getByPlaceholder("Search repositories...");

    // Search for 'react'
    await searchInput.fill("react");

    // Locate the resulting link using its href
    const repoLink = page.locator('a[href*="repos/facebook/react"]').first();
    await expect(repoLink).toBeVisible();

    // ---------------------------------------------
    // Scenario A: Browser Back Test
    // ---------------------------------------------
    console.log("Testing Browser Back...");

    // Navigate to the detail page
    await repoLink.click();
    await expect(page).toHaveURL(/\/repos\/facebook\/react/);

    // Press the browser back button
    await page.goBack();

    // Verification: State should be restored
    await expect(page).toHaveURL(/\?q=react/); // URL restored
    await expect(searchInput).toHaveValue("react"); // Input restored
    await expect(repoLink).toBeVisible(); // List restored (cached results)

    // ---------------------------------------------
    // Scenario B: Breadcrumb Home Link Test
    // ---------------------------------------------
    console.log("Testing Breadcrumb Home Link...");

    // Navigate back to the detail page
    await repoLink.click();
    await expect(page).toHaveURL(/\/repos\/facebook\/react/);

    // Click the "Home" link in the Breadcrumb
    await page.getByRole("link", { name: "Home" }).click();

    // Verification: State should be restored via Zustand store
    await expect(page).toHaveURL(/\?q=react/); // URL restored (via Zustand link rewrite)
    await expect(searchInput).toHaveValue("react"); // Input restored
    await expect(repoLink).toBeVisible(); // List restored
  });

  // S-4: Infinite Scroll Verification
  test("S-4: Should load more items on scroll", async ({ page }) => {
    // Note: This test requires mocking subsequent pages of results for stability
    await page.goto("/?q=javascript");

    const cardSelector = 'a[href*="/repos/"]';

    // 1. Wait for initial load
    const firstCard = page.locator(cardSelector).first();
    await firstCard.waitFor();

    // Get the initial count of items
    const initialCount = await page.locator(cardSelector).count();
    console.log(`Initial count: ${initialCount}`);

    // 2. Scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // 3. Assert item count increases (wait for the fetchNextPage to complete)
    await expect(async () => {
      const newCount = await page.locator(cardSelector).count();
      console.log(`Current count: ${newCount}`);
      expect(newCount).toBeGreaterThan(initialCount);
    }).toPass({ timeout: 10000 });
  });
});
