import { describe, it, expect } from "vitest";
import LoginPage from "../pageObjects/LoginPage";
import { loginHelper } from "../utils/loginHelper";

describe("Login Page", () => {
  it("should allow user to log in with valid credentials", async () => {
    const loginPage = new LoginPage();
    await loginHelper.login(loginPage, "validUser", "validPassword");
    expect(await loginPage.isDashboardVisible()).toBeTruthy();
  });

  it("should show error with invalid credentials", async () => {
    const loginPage = new LoginPage();
    await loginHelper.login(loginPage, "invalidUser", "invalidPassword");
    expect(await loginPage.getErrorMessage()).toBe(
      "Invalid username or password"
    );
  });
});
