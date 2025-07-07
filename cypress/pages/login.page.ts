export class LoginPage {
  visit() {
    cy.visit("/login");
  }

  email = () => cy.get('input[data-test-id="email"]');
  password = () => cy.get('input[data-test-id="password"]');
  submitBtn = () => cy.get('button[data-test-id="login"]');
  formErrorEmail = () => cy.get("[data-test-id=form-error-email]");
  formErrorPassword = () => cy.get("[data-test-id=form-error-password]");
  toastErrorTitle = () => cy.get("#toasts_invalidPassword_title");
  toastErrorMessage = () => cy.get("#toasts_invalidPassword_message");
  forgotPasswordLink = () => cy.get('a[data-test-id="forgot"]');
  loginTitle = () => cy.get("#userMenu_login");

  fillForm(user: { email: string; password: string }) {
    this.email().clear().type(user.email);
    this.password().clear().type(user.password);
  }

  verifyErrorMessage() {
    this.toastErrorTitle().should(
      "contain.text",
      "Your email and/or your password is invalid.",
    );
    this.toastErrorMessage().should(
      "contain.text",
      "Please check them and try again or click 'forgot password' to reset it.",
    );
  }

  submit() {
    this.submitBtn().click();
  }

  forgotPassword() {
    this.forgotPasswordLink().click();
    cy.url().should("include", "/forgot");
  }
}
