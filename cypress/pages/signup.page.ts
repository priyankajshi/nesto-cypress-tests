import { User } from "@support/type";

export class SignupPage {
  visit() {
    cy.visit("/signup");
  }
  firstName = () => cy.get('input[data-test-id="firstName"]');
  lastName = () => cy.get('input[data-test-id="lastName"]');
  email = () => cy.get('input[data-test-id="email"]');
  phone = () => cy.get('input[data-test-id="phone"]');
  password = () => cy.get('input[data-test-id="password"]');
  confirmPassword = () => cy.get('input[data-test-id="passwordConfirm"]');
  consentCheckbox = () =>
    cy.get('input[data-test-id="leadDistributeConsentAgreement"]');
  submitBtn = () => cy.get('button[data-test-id="createYourAccount"]');
  formErrorFirstName = () => cy.get("[data-test-id=form-error-firstName]");
  formErrorlastName = () => cy.get('[data-test-id="form-error-lastName"]');
  formErrorEmail = () => cy.get('[data-test-id="form-error-email"]');
  errorMessageEmail = () =>
    cy.get('[data-test-id="validation_errors_invalidEmail"]');
  formErrorPhone = () => cy.get('[data-test-id="form-error-phone"]');
  formErrorPassword = () => cy.get('[data-test-id="form-error-password"]');
  formErrorConfirmPassword = () =>
    cy.get('[data-test-id="form-error-passwordConfirm"]');

  fillForm(user: User) {
    if (
      !user ||
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.phone ||
      !user.password
    ) {
      throw new Error("Invalid user data provided");
    }
    this.firstName().clear().type(user.firstName);
    this.lastName().clear().type(user.lastName);
    this.email().clear().type(user.email);
    this.phone().clear().type(user.phone.toString());
    this.password().clear().type(user.password);
    this.confirmPassword().clear().type(user.password);
    this.consentCheckbox().check();
  }

  submit() {
    this.submitBtn().click();
  }

  getErrorMessage() {
    return cy.get(".error-message");
  }
}
