import { SignupPage } from "@pages/signup.page";
import { generateUniqueUser } from "@support/utils";
import { GetAQuotePage } from "@pages/getaquote.page";

describe("Signup Flow UI Tests", () => {
  const signupPage = new SignupPage();
  const getaquote = new GetAQuotePage();

  beforeEach(() => {
    signupPage.visit();
  });

  it("TC01: Should load the signup page", () => {
    cy.url().should("include", "/signup");
    cy.title().should("include", "nesto");

    signupPage.firstName().should("exist");
    signupPage.lastName().should("exist");
    signupPage.email().should("exist");
    signupPage.phone().should("exist");
    signupPage.password().should("exist");
    signupPage.confirmPassword().should("exist");
    signupPage.submitBtn().should("exist");
  });

  it("TC02: Should show validation errors when submitting empty form", () => {
    signupPage.submit();

    cy.fixture("error-messages").then((messages) => {
      signupPage.formErrorFirstName().should("contain", messages.requiredField);
      signupPage.formErrorlastName().should("contain", messages.requiredField);
      signupPage.formErrorEmail().should("contain", messages.requiredField);
      signupPage.formErrorPhone().should("contain", messages.requiredField);
      signupPage.formErrorPassword().should("contain", messages.requiredField);
      signupPage
        .formErrorConfirmPassword()
        .should("contain", messages.requiredField);
    });
  });

  it("TC03: Should validate email format", () => {
    signupPage.email().type("bad-email");
    signupPage.password().type("short");
    signupPage.submit();

    signupPage.errorMessageEmail().should("have.text", "Invalid email address");
  });

  it("TC04: Should successfully sign up a new user", () => {
    cy.fixture("user-template").then((template) => {
      const user = generateUniqueUser(template);

      expect(user, "user test data is defined").to.not.be.undefined;

      signupPage.fillForm(user);

      cy.intercept("POST", "/api/accounts").as("createAccount");
      signupPage.submit();
      cy.wait("@createAccount");

      cy.url().should("include", "/getaquote");
      getaquote.logoutBtn().should("exist");
      getaquote.pageTile().should("exist");
    });
  });
});
