describe("order creation tests", () => {
  beforeEach(() => {
    cy.prepareintercepts();
    cy.visit("/");
    cy.wait(500);
  });

  it("should redirect to /login page if user is not logged in", () => {
    // Arrange
    const bunIngredient = cy.get("[data-testid=ingredient_test_element_1]");
    const sauceIngredient = cy.get("[data-testid=ingredient_test_element_4]");
    const mainIngredient = cy.get("[data-testid=ingredient_test_element_2]");
    const topBunDropRef = cy.get("[data-testid=top_bun_drop_test_element]");
    const orderButton = cy.get("[data-testid=order_button_test_element]");
    let fillerDropRef = cy.get("[data-testid=filler_drop_test_element]");

    // Act
    bunIngredient.trigger("dragstart");
    topBunDropRef.trigger("drop");
    sauceIngredient.trigger("dragstart");
    fillerDropRef.trigger("drop");
    fillerDropRef = cy.get("[data-testid=filler_drop_test_element]");
    mainIngredient.trigger("dragstart");
    fillerDropRef.trigger("drop");
    orderButton.click();

    // Assert
    cy.url().should("contain", "/login");
  });

  it("should show order details modal after order was created", () => {
    // Arrange
    cy.userlogin("test@test.com", "123");
    const bunIngredient = cy.get("[data-testid=ingredient_test_element_1]");
    const sauceIngredient = cy.get("[data-testid=ingredient_test_element_4]");
    const mainIngredient = cy.get("[data-testid=ingredient_test_element_2]");
    const topBunDropRef = cy.get("[data-testid=top_bun_drop_test_element]");
    const orderButton = cy.get("[data-testid=order_button_test_element]");
    let fillerDropRef = cy.get("[data-testid=filler_drop_test_element]");

    // Act
    bunIngredient.trigger("dragstart");
    topBunDropRef.trigger("drop");
    sauceIngredient.trigger("dragstart");
    fillerDropRef.trigger("drop");
    fillerDropRef = cy.get("[data-testid=filler_drop_test_element]");
    mainIngredient.trigger("dragstart");
    fillerDropRef.trigger("drop");
    orderButton.click();
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
