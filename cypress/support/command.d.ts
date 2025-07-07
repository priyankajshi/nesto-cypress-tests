import { User } from './type';

declare global {
  namespace Cypress {
    interface Chainable {
      signupViaAPI(user: User): Chainable;
      loginViaAPI(email: string, password: string): Chainable;
    }
  }
}

export {};
