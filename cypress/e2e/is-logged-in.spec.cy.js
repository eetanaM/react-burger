describe("should be logged in as Test user", () => {
  it("should open login page, type login data and log in as Test user", () => {
    cy.prepareintercepts();
    cy.userlogin("test@test.com", "123");
    cy.get("[data-testid=user_name_element]").should("have.text", "Test");
  });
});
