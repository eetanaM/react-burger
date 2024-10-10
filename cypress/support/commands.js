/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("prepareintercepts", () => {
  cy.intercept("POST", "login", { fixture: "login" });
  cy.intercept("GET", "ingredients", { fixture: "ingredients" }).as(
    "getIngredients"
  );
  cy.intercept("POST", "orders", { fixture: "order" });
  window.localStorage.setItem("refreshToken", "refresh-token");
});

Cypress.Commands.add("userlogin", (email, password) => {
  cy.visit("/login");
  const emailInput = cy.get("[data-testid=email_input]");
  const passwordInput = cy.get("[data-testid=password_input]");

  emailInput.type(`${email}`);
  passwordInput.type(`${password}{enter}`);
});