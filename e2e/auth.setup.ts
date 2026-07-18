import path from "path";

import { test as setup } from "@playwright/test";

const API_URL = process.env.PLAYWRIGHT_API_URL ?? "http://localhost:3000/api";
const OWNER = { email: "admin-kavas@gmail.com", password: "12345678" };
const authFile = path.join(__dirname, ".auth", "owner.json");

setup("authenticate as board owner", async ({ page, request }) => {
  const response = await request.post(`${API_URL}/auth/login`, { data: OWNER });
  const body = await response.json();
  const { accessToken, refreshToken } = body.data as {
    accessToken: string;
    refreshToken: string;
  };

  await page.goto("/login");
  await page.evaluate(
    ([access, refresh]) => {
      localStorage.setItem("kanvas_access_token", access);
      localStorage.setItem("kanvas_refresh_token", refresh);
    },
    [accessToken, refreshToken],
  );

  await page.goto("/boards");
  await page.waitForURL("/boards");

  await page.context().storageState({ path: authFile });
});
