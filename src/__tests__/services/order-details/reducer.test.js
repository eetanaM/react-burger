import {
  orderDetailsReducer,
  initialState,
  showOrder,
  hideOrder,
} from "../../../services/order-details/slice";

describe("Order details reducer tests", () => {
  it("should return initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual({ ...initialState });
  });
});
