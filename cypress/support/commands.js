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
  cy.intercept("GET", "user", { fixture: "user" });
  cy.intercept("GET", "ingredients", { fixture: "ingredients" }).as(
    "getIngredients"
  );
  cy.intercept("POST", "orders", { fixture: "order" }).as("postOrder");
  window.localStorage.setItem("refreshToken", "refresh-token");
});

Cypress.Commands.add("userlogin", (email, password) => {
  cy.visit("/login");
  const emailInput = cy.get("[data-testid=email_input]");
  const passwordInput = cy.get("[data-testid=password_input]");

  emailInput.type(`${email}`);
  passwordInput.type(`${password}{enter}`);
});

Cypress.Commands.add("getBunTestElement", (id) => {
  return cy.get(`[data-testid=bun_test_element_${id}]`);
});

Cypress.Commands.add("getSauceTestElement", (id) => {
  return cy.get(`[data-testid=sauce_test_element_${id}]`);
});

Cypress.Commands.add("getMainTestElement", (id) => {
  return cy.get(`[data-testid=main_test_element_${id}]`);
});

Cypress.Commands.add("getTopBunDropRef", () => {
  return cy.get("[data-testid=top_bun_drop_test_element]");
});

Cypress.Commands.add("getFillerDropRef", () => {
  return cy.get("[data-testid=filler_drop_test_element]");
});

Cypress.Commands.add("getBunInnerElement", (position, element) => {
  return cy.get(
    `[data-testid="${position}_bun_drop_test_element"] > .constructor-element > .constructor-element__row > .constructor-element__${element}`
  );
});

Cypress.Commands.add("getFillerInnerElement", (child, element) => {
  return cy.get(
    `[data-testid="filler_drop_test_element"] > :nth-child(${child}) > .constructor-element > .constructor-element__row > .constructor-element__${element}`
  );
});
