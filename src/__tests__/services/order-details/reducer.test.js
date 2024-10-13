import { loadOrder } from "../../../services/order-details/action";
import {
  orderDetailsReducer,
  initialState,
  showOrder,
  hideOrder,
} from "../../../services/order-details/slice";

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
  counter: 0,
};
const mockOrder = {
  ingredients: [mockIngredient, mockIngredient, mockIngredient, mockIngredient],
  number: 55551,
  status: "done",
  name: "Space флюоресцентный бургер",
  _id: "6704cceb13a2b7001c8f09cb",
  createdAt: "2024-10-08T06:10:51.110Z",
};

describe("Order details reducers tests", () => {
  const UNKNOWN_ACTION = "UNKNOWN_ACTION";

  it("should return initial state with EMPTY action passed", () => {
    expect(orderDetailsReducer({ ...initialState }, {})).toEqual({
      ...initialState,
    });
  });

  it("should return initial state with UNKNOWN action passed", () => {
    expect(
      orderDetailsReducer({ ...initialState }, { type: UNKNOWN_ACTION })
    ).toEqual({ ...initialState });
  });

  it("should handle showOrder action", () => {
    expect(
      orderDetailsReducer(
        { ...initialState },
        { type: showOrder.type, payload: mockOrder }
      )
    ).toEqual({ ...initialState, order: mockOrder, success: true });
  });

  it("should handle hideOrder action", () => {
    expect(
      orderDetailsReducer(
        { ...initialState, order: mockOrder, success: true },
        { type: hideOrder.type }
      )
    ).toEqual({ ...initialState });
  });

  it("should handle loadOrder.pending action", () => {
    expect(
      orderDetailsReducer({ ...initialState }, { type: loadOrder.pending.type })
    ).toEqual({ ...initialState, error: null });
  });

  it("should handle loadOrder.fulfilled action", () => {
    expect(
      orderDetailsReducer(
        { ...initialState },
        { type: loadOrder.fulfilled.type, payload: { order: mockOrder } }
      )
    ).toEqual({ ...initialState, success: true, order: mockOrder });
  });

  it("should handle loadOrder.rejected action", () => {
    const mockError = "Error occured";

    expect(
      orderDetailsReducer(
        { ...initialState },
        { type: loadOrder.rejected.type, error: mockError }
      )
    ).toEqual({ ...initialState, error: mockError });
  });
});
