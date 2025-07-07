import { BasePage } from "@pages/BasePage";
import { LoginPage } from "@pages/login.page";

const basePage = new BasePage();
const loginPage = new LoginPage();

describe("Locale switch on login page", () => {
  const languages = ["EN", "FR"];

  languages.forEach((lang) => {
    it(`should display login page in ${lang.toUpperCase()}`, () => {
      basePage.visit("/login");

      basePage.selectLanguage(lang);

      // Assertion: check if language change applied
      const expectedText = lang === "FR" ? "Connexion" : "Login";

      loginPage.loginTitle().should("contain.text", expectedText);
    });
  });
});
