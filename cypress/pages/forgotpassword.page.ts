export class ForgotPasswordPage {
  visit() {
    cy.visit('/forgot');
  }

  emailInput = () => cy.get('input[data-test-id="email"]');
  returnBtn = () => cy.get('button[data-test-id="login"]');
  sendBtn = () => cy.get('[data-test-id=resetPassword]');
  forgotPasswordConfirmation = () => cy.get('[data-test-id=form_resetPassword_confirmation]');

  enterEmail(email: string) {
    this.emailInput().clear().type(email);
  }

  returnToLogin() {
    this.returnBtn().click();
  }

  sendResetLink() {
    this.sendBtn().click();
  }

  verifyConfirmationMessage() {
    this.forgotPasswordConfirmation().should(
      'contain.text',
      'A password reset link has been sent to your email. Please follow the instructions within the email.'
    );
  }
}
