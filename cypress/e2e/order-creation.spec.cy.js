describe("order creation tests", () => {
  beforeEach(() => {
    cy.prepareintercepts();
    cy.visit("/");
    cy.wait(500);
  });

  it("should redirect to /login page if user is not logged in", () => {
    // Arrange

    // Act
    cy.getBunTestElement(1).trigger("dragstart");
    cy.getTopBunDropRef().trigger("drop");
    cy.getSauceTestElement(4).trigger("dragstart");
    cy.getFillerDropRef().trigger("drop");
    cy.getMainTestElement(2).trigger("dragstart");
    cy.getFillerDropRef().trigger("drop");
    cy.get("[data-testid=order_button_test_element]").click();

    // Assert
    cy.url().should("contain", "/login");
  });

  it("should show order details modal after order was created", () => {
    // Arrange
    cy.userlogin("test@test.com", "123");

    // Act
    cy.getBunTestElement(1).trigger("dragstart");
    cy.getTopBunDropRef().trigger("drop");
    cy.getSauceTestElement(4).trigger("dragstart");
    cy.getFillerDropRef().trigger("drop");
    cy.getFillerDropRef() = cy.get("[data-testid=filler_drop_test_element]");
    cy.getMainTestElement(2).trigger("dragstart");
    cy.getFillerDropRef().trigger("drop");
    cy.get("[data-testid=order_button_test_element]").click();
    cy.wait("@postOrder");

    // Assert
    cy.get("[data-testid=modal_test_element]")
      .should("exist")
      .and("be.visible");
    cy.get("[data-testid=order_details_number_test_element]").should(
      "have.text",
      "12345"
    );
  });
});
