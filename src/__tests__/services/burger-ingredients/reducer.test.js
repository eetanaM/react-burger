import {
  ingredientsReducer,
  initialState,
  incrementCount,
  decrementCount,
  clearCounts,
} from "../../../services/burger-ingredients/slice";

describe("Burger ingredients reducer tests", () => {
  it("should return initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual({ ...initialState });
  });
});
