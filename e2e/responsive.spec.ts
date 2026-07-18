import { expect, test, type Page } from "@playwright/test";

const API_URL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000/api";

const STATIC_PAGES = [
  { name: "boards", path: "/boards" },
  { name: "templates", path: "/templates" },
  { name: "templates-category", path: "/templates/business" },
  { name: "templates-mine", path: "/templates/mine" },
  { name: "profile", path: "/profile" },
  { name: "settings", path: "/settings" },
];

async function assertNoHorizontalOverflow(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth, "page should not scroll horizontally").toBeLessThanOrEqual(clientWidth + 1);
}

for (const { name, path } of STATIC_PAGES) {
  test(`${name} has no horizontal overflow`, async ({ page }, testInfo) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await assertNoHorizontalOverflow(page);
    await page.screenshot({
      path: `e2e/screenshots/${testInfo.project.name}-${name}.png`,
      fullPage: true,
    });
  });
}

test("board detail has no horizontal overflow", async ({ page, request }, testInfo) => {
  await page.goto("/boards");
  const token = await page.evaluate(() => localStorage.getItem("kanvas_access_token"));

  const res = await request.get(`${API_URL}/boards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  const boardId = body.data?.[0]?.id as string | undefined;
  test.skip(!boardId, "no board available to test");

  await page.goto(`/boards/${boardId}`);
  await page.waitForLoadState("networkidle");
  await assertNoHorizontalOverflow(page);
  await page.screenshot({
    path: `e2e/screenshots/${testInfo.project.name}-board-detail.png`,
    fullPage: true,
  });
});

test("template detail has no horizontal overflow", async ({ page, request }, testInfo) => {
  await page.goto("/templates");
  const token = await page.evaluate(() => localStorage.getItem("kanvas_access_token"));

  const res = await request.get(
    `${API_URL}/boards/templates?category=BUSINESS&pageSize=1`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const body = await res.json();
  const template = body.data?.items?.[0] as { id: string } | undefined;
  test.skip(!template, "no template available to test");

  await page.goto(`/templates/business/${template!.id}`);
  await page.waitForLoadState("networkidle");
  await assertNoHorizontalOverflow(page);
  await page.screenshot({
    path: `e2e/screenshots/${testInfo.project.name}-template-detail.png`,
    fullPage: true,
  });
});

test("mobile sidebar drawer opens, navigates, and closes", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width >= 768, "only relevant on mobile viewport");

  await page.goto("/boards");

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  const templatesLink = page.getByRole("link", { name: "Templates" });
  await expect(templatesLink).toBeVisible();
  await templatesLink.click();

  await page.waitForURL("/templates");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});
