import {
  constructorReducer,
  initialState,
  addIngredientToOrder,
  removeIngredientFromOrder,
  moveIngredient,
  clearIngredients,
} from "../../../services/burger-constructor/slice";

const mockIngredient = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
  key: "asd1234",
};

describe("Burger constructor reducer tests", () => {
  it("should return initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual({ ...initialState });
  });

  it("should handle addIngredientToOrder action (might add 2 items in bunsToOrder field if it's type bun)", () => {
    expect(
      constructorReducer(
        { ...initialState },
        {
          type: addIngredientToOrder.type,
          payload: { ...mockIngredient },
        }
      )
    ).toEqual({
      ...initialState,
      bunsToOrder: [{ ...mockIngredient }, { ...mockIngredient }],
    });
  });

  it("should handle addIngredientsToOrder action (might add 1 item in ingredientsToOrder field if it's type not bun", () => {
    expect(
      constructorReducer(
        { ...initialState },
        {
          type: addIngredientToOrder.type,
          payload: { ...mockIngredient, type: "sauce" },
        }
      )
    ).toEqual({
      ...initialState,
      fillerToOrder: [{ ...mockIngredient, type: "sauce" }],
    });
  });

  it("should handle removeIngredientFromOrder action", () => {
    expect(
      constructorReducer(
        { ...initialState, fillerToOrder: [mockIngredient] },
        { type: removeIngredientFromOrder.type, payload: { id: "asd1234" } }
      )
    ).toEqual({ ...initialState });
  });

  it("should handle moveIngredient action", () => {
    const anotherMockIngredient = {
      ...mockIngredient,
      name: "Соус традиционный галактический",
    };
    expect(
      constructorReducer(
        {
          ...initialState,
          bunsToOrder: [],
          fillerToOrder: [mockIngredient, anotherMockIngredient],
        },
        {
          type: moveIngredient.type,
          payload: { dragIndex: 1, hoverIndex: 0 },
        }
      )
    ).toEqual({
      bunsToOrder: [],
      fillerToOrder: [anotherMockIngredient, mockIngredient],
    });
  });

  it("should handle clearIngredients action", () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          bunsToOrder: [
            mockIngredient,
            mockIngredient,
            mockIngredient,
            mockIngredient,
          ],
          fillerToOrder: [
            mockIngredient,
            mockIngredient,
            mockIngredient,
            mockIngredient,
          ],
        },
        { type: clearIngredients.type }
      )
    ).toEqual({ ...initialState });
  });
});
