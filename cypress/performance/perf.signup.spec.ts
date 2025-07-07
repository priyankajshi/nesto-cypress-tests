/// <reference types="cypress" />

import { generateUniqueUser } from "@support/utils";

describe("API Signup Tests", () => {
  it("performance: signup API < 300ms", () => {
    cy.fixture("user-template").then((template) => {
      const user = generateUniqueUser(template);
      cy.signupViaAPI(user).then((res) => {
        expect(res.duration).to.be.lt(300);
      });
    });
  });
});
