import { test, expect } from "@playwright/test";

test.describe("Frame UI — carousel generation", () => {

  test("loads with brand selector", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("ColorFlix")).toBeVisible();
  });

  test("brief form is interactive", async ({ page }) => {
    await page.goto("/");
    const input = page.getByPlaceholder(/campaign/i);
    await input.fill("Glimmer Pop launch — everyday bold");
    await expect(input).toHaveValue("Glimmer Pop launch — everyday bold");
  });

  test("generate button is present", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: /generate/i });
    await expect(button).toBeVisible();
  });

  // This test requires a real API key — skip in CI unless LLM_TEST_KEY is set
  test.skip("generates five carousel slides end-to-end", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder(/campaign/i).fill("Glimmer Pop launch");
    await page.getByRole("button", { name: /generate/i }).click();

    // Wait up to 30s for generation
    await expect(page.getByTestId("slide-1")).toBeVisible({ timeout: 30000 });
    await expect(page.getByTestId("slide-5")).toBeVisible({ timeout: 30000 });
  });
});
