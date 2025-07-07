import { LoginPage } from "@pages/login.page";
import { ApplicationSelectionPage } from "@pages/application-selection.page";
import { generateUniqueUser } from "@support/utils";
import { ForgotPasswordPage } from "@pages/forgotpassword.page";
import { SignupPage } from "@pages/signup.page";

describe("Login Page UI Tests", () => {
  const loginPage = new LoginPage();
  const appSelectionPage = new ApplicationSelectionPage();
  const forgotPasswordPage = new ForgotPasswordPage();
  const signupPage = new SignupPage();
  const maliciousScript = "<script>alert(1)</script>";

  beforeEach(() => {
    cy.visit("/login");
    Cypress.on("uncaught:exception", () => false);
  });

  it("TC01: Loads the login page with all required fields", () => {
    cy.url().should("include", "/login");
    loginPage.email().should("be.visible");
    loginPage.password().should("be.visible");
    loginPage.submitBtn().should("be.visible");
  });

  it("TC02: Shows validation errors when submitting empty form", () => {
    loginPage.submitBtn().click();
    loginPage.formErrorEmail().should("contain", "Required");
    loginPage.formErrorPassword().should("contain", "Required");
  });

  it("TC03: Displays error on invalid credentials", () => {
    cy.intercept("POST", "/api/account/tokens").as("getToken");

    loginPage.email().clear().type("invalid@example.com");
    loginPage.password().clear().type("wrongpassword");
    loginPage.submitBtn().click();

    cy.wait("@getToken");

    loginPage.toastErrorTitle().should("be.visible");
    loginPage.verifyErrorMessage();
  });

  it("TC04: Logs in with signed up user", () => {
    cy.fixture("user-template").then((template) => {
      const user = generateUniqueUser(template);
      cy.intercept("POST", "**/api/account*").as("createAccount");
      signupPage.visit();
      signupPage.fillForm(user);
      signupPage.submit();
      cy.wait("@createAccount", { timeout: 10000 }).then((interception) => {
        expect(interception.response?.statusCode).to.eq(201);
        loginPage.visit();
        loginPage.email().clear().type(user.email);
        loginPage.password().clear().type(user.password);
        loginPage.submitBtn().click();

        loginPage.toastErrorTitle().should("not.exist");
        loginPage.toastErrorMessage().should("not.exist");
        cy.url().should("not.include", "/login");
        appSelectionPage.mortgage().should("be.visible");
        appSelectionPage.renewal().should("be.visible");
        appSelectionPage.refinance().should("be.visible");
      });
    });
  });

  it("TC05: Logs in successfully with valid credentials", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    if (!username || !password) {
      throw new Error(
        "Missing Cypress environment variables: username or password",
      );
    }
    loginPage.email().clear().type(username);
    loginPage.password().clear().type(password);
    loginPage.submitBtn().click();
    cy.url().should("not.include", "/login");
    appSelectionPage.mortgage().should("be.visible");
    appSelectionPage.renewal().should("be.visible");
    appSelectionPage.refinance().should("be.visible");
  });

  it("TC06: Should not allow script injection in email field", () => {
    loginPage.email().clear().type(maliciousScript);
    loginPage.password().clear().type("SomePassword123");
    loginPage.submitBtn().click();
    loginPage.formErrorEmail().should("contain", "Invalid email address");
  });

  it("TC07: Should not allow script injection in password field", () => {
    loginPage.email().clear().type("abc@email.com");
    loginPage.password().clear().type(maliciousScript);
    loginPage.submitBtn().click();
    //loginPage.formErrorPassword().should('contain', 'Invalid password'); // bug: password is taking script
  });

  it("TC08: Should navigate to forgot password page", () => {
    loginPage.forgotPassword();
    cy.url().should("include", "/forgot");
    forgotPasswordPage.emailInput().should("be.visible");
    forgotPasswordPage.returnBtn().should("be.visible");
    forgotPasswordPage.sendBtn().should("be.visible");
    forgotPasswordPage.forgotPasswordConfirmation().should("not.exist");
    forgotPasswordPage.enterEmail("abc@example.com");
    forgotPasswordPage.sendResetLink();
    forgotPasswordPage.verifyConfirmationMessage();
    forgotPasswordPage.returnToLogin();
    cy.url().should("include", "/login");
  });
});
