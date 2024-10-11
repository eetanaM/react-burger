describe("burger constructor test suites", () => {
  beforeEach(() => {
    cy.prepareintercepts();
    cy.userlogin("test@test.com", "123");
    cy.wait(300);
  });

  it("should fill constructor with correctly dropped ingredients", () => {
    // Arrange

    // Act
    cy.getBunTestElement(1).trigger("dragstart");
    cy.getTopBunDropRef().trigger("drop");
    cy.getSauceTestElement(4).trigger("dragstart");
    cy.getFillerDropRef().trigger("drop");
    cy.getMainTestElement(2).trigger("dragstart");
    cy.getFillerDropRef().trigger("drop");

    // Assert
    // Проверяем, что элемент верхней булки конструктора заполнен корректными данными
    cy.get(
      '[data-testid="top_bun_drop_test_element"] > .constructor-element > .constructor-element__row > .constructor-element__image'
    ).should(
      "have.attr",
      "src",
      "https://code.s3.yandex.net/react/code/bun-02.png"
    );
    cy.get(
      '[data-testid="top_bun_drop_test_element"] > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).should("have.text", "Краторная булка N-200i (верх)");
    cy.get(
      '[data-testid="top_bun_drop_test_element"] > .constructor-element > .constructor-element__row > .constructor-element__price'
    ).should("have.text", 1255);

    // Проверяем, что элементы начинки заполнены корректными данными
    // Соус
    cy.get(
      '[data-testid="filler_drop_test_element"] > :nth-child(1) > .constructor-element > .constructor-element__row > .constructor-element__image'
    ).should(
      "have.attr",
      "src",
      "https://code.s3.yandex.net/react/code/sauce-02.png"
    );
    cy.get(
      '[data-testid="filler_drop_test_element"] > :nth-child(1) > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).should("have.text", "Соус Spicy-X");
    cy.get(
      '[data-testid="filler_drop_test_element"] > :nth-child(1) > .constructor-element > .constructor-element__row > .constructor-element__price'
    ).should("have.text", 90);
    // Основной ингредиент
    cy.get(
      ":nth-child(2) > .constructor-element > .constructor-element__row > .constructor-element__image"
    ).should(
      "have.attr",
      "src",
      "https://code.s3.yandex.net/react/code/meat-01.png"
    );
    cy.get(
      ":nth-child(2) > .constructor-element > .constructor-element__row > .constructor-element__text"
    ).should("have.text", "Биокотлета из марсианской Магнолии");
    cy.get(
      ":nth-child(2) > .constructor-element > .constructor-element__row > .constructor-element__price"
    ).should("have.text", 424);

    // Проверяем, что элемент нижней булки конструктора заполнен корректными данными
    cy.get(
      '[data-testid="bottom_bun_drop_test_element"] > .constructor-element > .constructor-element__row > .constructor-element__image'
    ).should(
      "have.attr",
      "src",
      "https://code.s3.yandex.net/react/code/bun-02.png"
    );
    cy.get(
      '[data-testid="bottom_bun_drop_test_element"] > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).should("have.text", "Краторная булка N-200i (низ)");
    cy.get(
      '[data-testid="bottom_bun_drop_test_element"] > .constructor-element > .constructor-element__row > .constructor-element__price'
    ).should("have.text", 1255);
  });

  it("should not fill constructor with incorrectly dropped ingredients", () => {
    // Arrange

    // Act
    cy.getBunTestElement(1).trigger("dragstart");
    cy.getFillerDropRef().trigger("drop");
    cy.getSauceTestElement(4).trigger("dragstart");
    cy.getTopBunDropRef().trigger("drop");
    cy.getMainTestElement(2).trigger("dragstart");
    cy.getTopBunDropRef().trigger("drop");

    // Assert
    // Проверяем, что элементы конструктора пустые
    // Верхняя булка
    cy.get('[data-testid="top_bun_drop_test_element"] > .text').should(
      "have.text",
      "Выберите булку"
    );

    // Начинка
    cy.get('[data-testid="filler_drop_test_element"] > .text').should(
      "have.text",
      "Выберите начинку"
    );
    // Нижняя булка
    cy.get('[data-testid="bottom_bun_drop_test_element"] > .text').should(
      "have.text",
      "Выберите булку"
    );
  });
});
