export class ApplicationSelectionPage {
  visit() {
    cy.visit("/application/selection");
  }

  pageTitle = () => cy.get('span[data-test-id="empty_application_title"]');
  mortgage = () => cy.get('div[data-test-id="newMortgage"]');
  renewal = () => cy.get('div[data-test-id="renewal"]');
  refinance = () => cy.get('div[data-test-id="refinance"]');

  verifyPageTitle(expectedTitle: string) {
    this.pageTitle().should("contain.text", expectedTitle);
  }
}
