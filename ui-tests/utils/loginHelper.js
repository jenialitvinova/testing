export const loginHelper = {
  async login(loginPage, username, password) {
    await loginPage.fillUsernameField(username);
    await loginPage.fillPasswordField(password);
    await loginPage.clickLoginButton();
  },
};
