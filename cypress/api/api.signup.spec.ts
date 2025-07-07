import { User } from '@support/type';
import { generateUniqueUser } from '../support/utils';

describe('User Signup API Tests', () => {
  let user: User;

  before(() => {
    return cy.fixture('user-template').then((template) => {
      user = generateUniqueUser(template);
    });
  });

  it('TC01: Signs up a unique user', () => {
    expect(user, 'user test data is defined').to.not.be.undefined;
    cy.signupViaAPI(user).then((resp) => {
      expect(resp.status).to.eq(201);
      expect(resp.body.account).to.have.property('email').and.contain(user.email);
      expect(resp.body.account).to.have.property('firstName').and.contain(user.firstName);
      expect(resp.body.account).to.have.property('lastName').and.contain(user.lastName);
      expect(resp.body.account).to.have.property('id');
    });
  });

  it('TC02: Sign up fails when signing up same user again', () => {
    expect(user, 'user test data is defined').to.not.be.undefined;
    cy.signupViaAPI(user).then((resp) => {
      expect(resp.status).to.eq(409);
      expect(resp.body.error).to.include('duplicate entity');
    });
  });
});
