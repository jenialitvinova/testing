export default class LoginPage {
  async fillUsernameField(username) {
    await $("#username").setValue(username); // Для WebDriverIO
    // Для Playwright замените на:
    // await page.fill('#username', username);
  }

  async fillPasswordField(password) {
    await $("#password").setValue(password); // Для WebDriverIO
    // Для Playwright замените на:
    // await page.fill('#password', password);
  }

  async clickLoginButton() {
    await $("#loginButton").click(); // Для WebDriverIO
    // Для Playwright замените на:
    // await page.click('#loginButton');
  }

  async isDashboardVisible() {
    return await $("#dashboard").isDisplayed(); // Для WebDriverIO
    // Для Playwright замените на:
    // return await page.isVisible('#dashboard');
  }

  async getErrorMessage() {
    return await $("#error").getText(); // Для WebDriverIO
    // Для Playwright замените на:
    // return await page.innerText('#error');
  }
}
