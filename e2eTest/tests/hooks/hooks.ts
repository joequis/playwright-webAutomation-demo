import { After, Before } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
});

After(async function (scenario) {
  if (this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, "image/png");
  }
});
