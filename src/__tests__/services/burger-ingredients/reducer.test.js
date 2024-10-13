import { loadIngredients } from "../../../services/burger-ingredients/actions";
import {
  ingredientsReducer,
  initialState,
  incrementCount,
  decrementCount,
  clearCounts,
} from "../../../services/burger-ingredients/slice";

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
};

const mockIngredientWithCounter = { ...mockIngredient, counter: 0 };

describe("Burger ingredients reducers tests", () => {
  const UNKNOWN_ACTION = "UNKNOWN_ACTION";

  it("should return initial state with EMPTY action passed", () => {
    expect(ingredientsReducer({ ...initialState }, {})).toEqual({
      ...initialState,
    });
  });

  it("should return initial state with UNKNOWN action passed", () => {
    expect(
      ingredientsReducer({ ...initialState }, { type: UNKNOWN_ACTION })
    ).toEqual({ ...initialState });
  });

  it("should handle incrementCount action: must increase counter value by 2 within ingredient wich type IS bun", () => {
    expect(
      ingredientsReducer(
        { ...initialState, ingredients: [mockIngredientWithCounter] },
        {
          type: incrementCount.type,
          payload: { id: "643d69a5c3f7b9001cfa093c" },
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: [{ ...mockIngredientWithCounter, counter: 2 }],
    });
  });

  it("should handle incrementCount action: must increase counter value by 1 within ingredient wich type IS NOT bun", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          ingredients: [{ ...mockIngredientWithCounter, type: "sauce" }],
        },
        {
          type: incrementCount.type,
          payload: { id: "643d69a5c3f7b9001cfa093c" },
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        { ...mockIngredientWithCounter, type: "sauce", counter: 1 },
      ],
    });
  });

  it("should handle decrementCount action: must decrease counter value by 2 within ingredient wich type IS bun", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          ingredients: [{ ...mockIngredientWithCounter, counter: 2 }],
        },
        {
          type: decrementCount.type,
          payload: { id: "643d69a5c3f7b9001cfa093c" },
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: [{ ...mockIngredientWithCounter, counter: 0 }],
    });
  });

  it("should handle decrementCount action: must decrease counter value by 1 within ingredient wich type IS NOT bun", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          ingredients: [
            { ...mockIngredientWithCounter, type: "sauce", counter: 1 },
          ],
        },
        {
          type: decrementCount.type,
          payload: { id: "643d69a5c3f7b9001cfa093c" },
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        { ...mockIngredientWithCounter, type: "sauce", counter: 0 },
      ],
    });
  });

  it("should handle clearCounts action", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          ingredients: [
            { ...mockIngredientWithCounter, counter: 2 },
            { ...mockIngredientWithCounter, counter: 1 },
            { ...mockIngredientWithCounter, counter: 4 },
            { ...mockIngredientWithCounter, counter: 5 },
          ],
        },
        { type: clearCounts.type }
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        mockIngredientWithCounter,
        mockIngredientWithCounter,
        mockIngredientWithCounter,
        mockIngredientWithCounter,
      ],
    });
  });

  it("should handle loadIngredients.pending action", () => {
    expect(
      ingredientsReducer(
        { ...initialState },
        { type: loadIngredients.pending.type }
      )
    ).toEqual({ ...initialState, loading: true });
  });

  it("should handle loadIngredients.fulfilled action", () => {
    const mockResponse = {
      data: [mockIngredient, mockIngredient, mockIngredient],
    };

    expect(
      ingredientsReducer(
        { ...initialState, loading: true },
        { type: loadIngredients.fulfilled.type, payload: mockResponse }
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        mockIngredientWithCounter,
        mockIngredientWithCounter,
        mockIngredientWithCounter,
      ],
      loading: false,
    });
  });

  it("should handle loadingIngredients.rejected action", () => {
    const mockError = "Error occured";

    expect(
      ingredientsReducer(
        { ...initialState, loading: true },
        { type: loadIngredients.rejected.type, error: mockError }
      )
    ).toEqual({ ...initialState, error: mockError, loading: false });
  });
});
