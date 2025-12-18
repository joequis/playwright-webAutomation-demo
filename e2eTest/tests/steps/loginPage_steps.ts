import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { LoginPage } from "../pages/loginPage.ts";

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('El usuario se encuentra en la home page', async function () {
  browser = await chromium.launch({ headless: false, slowMo: 100 });
  const browserCtx: BrowserContext = await browser.newContext({ viewport: null });
  page = await browserCtx.newPage();

  const env = process.env.ENV as "dev" | "qa" | "prod" || "prod";
  loginPage = new LoginPage(page, env);

  await loginPage.goto();
  if (page) {
    const screenshot = await page.screenshot();
    this.attach(screenshot, "image/png");
  }
  console.log("---------El usuario se encuentra en la home page---------");
});

When('El usuario ingresa Usuario {string} y Password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
  if (page) {
    const screenshot = await page.screenshot();
    this.attach(screenshot, "image/png");
  }
  console.log(`---------El usuario ingresa Usuario: ${username} y Password---------`);
});

Then('El usuario se encuentra logueado', async function () {
  const loggedIn = await loginPage.isLoggedIn();
  if (page) {
    const screenshot = await page.screenshot();
    this.attach(screenshot, "image/png");
  }
  console.log("---------El usuario se encuentra logueado---------", loggedIn);
  await browser.close();
});
