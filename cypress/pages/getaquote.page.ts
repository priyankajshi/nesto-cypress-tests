export class GetAQuotePage {
  visit() {
    cy.visit('/getaquote');
  }

  pageTile = () => cy.get('#getAQuote_pageTitle');
  logoutBtn = () => cy.get('#nav_logout');
}
