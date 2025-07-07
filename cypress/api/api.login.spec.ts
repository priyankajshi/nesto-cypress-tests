describe("Login API Tests", () => {
  it("TC01: Login with valid user", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    if (!username || !password) {
      throw new Error(
        "Missing Cypress environment variables: username or password",
      );
    }
    cy.loginViaAPI(username, password).then((resp) => {
      expect(resp.status).to.eq(201);
      expect(resp.body.account).to.have.property("email").and.contain(username);
      expect(resp.body.account).to.have.property("id");
    });
  });

  it("TC02: Fails when logging in with invalid users", () => {
    cy.fixture("login-credentials").then((users) => {
      cy.loginViaAPI(users.invalidUser.email, users.invalidUser.password).then(
        (resp) => {
          expect(resp.status).to.eq(400);
          expect(resp.body.error).to.include("invalid credentials");
        },
      );
    });
  });
});
