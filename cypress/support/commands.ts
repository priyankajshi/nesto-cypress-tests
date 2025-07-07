import { User } from './type';

export {};

Cypress.Commands.add('signupViaAPI', (user: User) => {
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + '/api/accounts',
    body: user,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('loginViaAPI', (email: string, password: string) => {
  return cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + '/api/account/tokens',
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  });
});
