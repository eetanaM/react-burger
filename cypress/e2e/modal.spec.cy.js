describe("modal element tests", () => {
  beforeEach(() => {
    cy.prepareintercepts();
    cy.visit("/");
    cy.wait(200);
  });

  /*
    Числовой идентификатор при отборе элемента в конце data-test-id
    атрибута должен совпадать с _id ингредиента, полученного из GET
    запроса по эндпоинту ingredients.
    В данных тестах отбирается ингредиент с _id = 1
  */

  it("should open modal by clicking on ingredient card", () => {
    // Arrange
    const ingredientElement = cy.get("[data-testid=ingredient_test_element_1]");

    // Act
    ingredientElement.click();

    // Assert
    cy.url().should("contain", "ingredients/1");
    cy.get("#react-modals").should("exist");
    cy.get("#root").should("exist");
    cy.get("[data-testid=modal_test_element]")
      .should("exist")
      .and("be.visible");
    cy.get("[data-testid=modal_overlay_test_element]").should("exist");
  });

  it("should close modal by clicking on close button", () => {
    // Arrange
    const ingredientElement = cy.get("[data-testid=ingredient_test_element_1]");

    // Act
    ingredientElement.click();
    cy.url().should("contain", "ingredients/1");
    cy.get("[data-testid=modal_test_element]").should("exist");
    cy.get("[data-testid=modal_test_close_button]").click();

    //Assert
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("[data-testid=modal_test_element]").should("not.exist");
  });

  it("should close modal by clicking on overlay", () => {
    // Arrange
    const ingredientElement = cy.get("[data-testid=ingredient_test_element_1]");

    // Act
    ingredientElement.click();
    cy.url().should("contain", "ingredients/1");
    cy.get("[data-testid=modal_test_element]").should("exist");
    cy.get("[data-testid=modal_overlay_test_element]").click("topLeft", {
      force: true,
    });

    //Assert
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("[data-testid=modal_test_element]").should("not.exist");
  });

  it("should close modal by clicking Esc button", () => {
    // Arrange
    const ingredientElement = cy.get("[data-testid=ingredient_test_element_1]");

    // Act
    ingredientElement.click();
    cy.url().should("contain", "ingredients/1");
    cy.get("[data-testid=modal_test_element]").should("exist");
    cy.get("body").type("{esc}");

    //Assert
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("[data-testid=modal_test_element]").should("not.exist");
  });
});
