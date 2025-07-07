import { get } from "node_modules/cypress/types/lodash/index.js";

export class BasePage {
  visit(path: string) {
    cy.visit(Cypress.config("baseUrl") + path);
  }

  localeSelector = () => cy.get("[data-test-id=toggle-language]");

  toggleLanguageSelector() {
    this.localeSelector().click();
  }

  selectLanguage(langCode: string) {
    if (langCode !== "FR" && langCode !== "EN") {
      throw new Error(
        'Unsupported language code. Use "FR" for French or "EN" for English.',
      );
    }

    this.localeSelector()
      .invoke("text")
      .then((text) => {
        const locale = text.trim().toUpperCase();
        expect(locale).to.be.oneOf(["FR", "EN"]);
        expect(locale).to.be.oneOf(["FR", "EN"]);
        if (locale === langCode) {
          // If the selected language and locale on page the same
          this.toggleLanguageSelector();
          return;
        } else {    
            // If the selected language and locale on page are different which means language is as expected
            return;
        }  
      });
  }
}
