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

  it("should show ingredient details in modal", () => {
    // Arrange
    const ingredientElement = cy.get("[data-testid=ingredient_test_element_1]");

    // Act
    ingredientElement.click();

    // Assert
    cy.get("[data-testid=ingredient_details_header_test_element]").should(
      "have.text",
      "Детали ингредиента"
    );
    cy.get("[data-testid=ingredient_details_image_test_element]").should(
      "have.attr",
      "src",
      "https://code.s3.yandex.net/react/code/bun-02-large.png"
    );
    cy.get("[data-testid=ingredient_details_name_test_element]").should(
      "have.text",
      "Краторная булка N-200i"
    );
    cy.get("[data-testid=ingredeint_details_calories_test_element]").should(
      "have.text",
      420
    );
    cy.get("[data-testid=ingredient_details_proteins_test_element]").should(
      "have.text",
      80
    );
    cy.get("[data-testid=ingredient_details_fat_test_element]").should(
      "have.text",
      24
    );
    cy.get(
      "[data-testid=ingredient_details_carbohydrates_test_element]"
    ).should("have.text", 53);
  });
});
