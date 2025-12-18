import type { Page } from "playwright";
import { environments } from "../../../config/env.ts";
import { loginLocators } from "../locators/loginLocators.ts"
import { PageBase } from "./PageBase.ts";


export class LoginPage extends PageBase {
  private env: keyof typeof environments;

  usernameInput;
  passwordInput;
  loginButton;

  constructor(page: Page, env: keyof typeof environments) {
    super(page);
    this.env = env;

    this.usernameInput = this.page.locator(loginLocators.usernameInput);
    this.passwordInput = this.page.locator(loginLocators.passwordInput);
    this.loginButton   = this.page.locator(loginLocators.loginButton);
  }

  async goto() {
    await super.goto(environments[this.env]);
  }

  async login(username: string, password: string) {
    await super.fill(this.usernameInput, username);
    await super.fill(this.passwordInput, password);
    await super.click(this.loginButton);
  }

  async isLoggedIn(): Promise<boolean> {
    return await super.isVisible(this.page.locator(loginLocators.shoppingCart));
    

  }
}
