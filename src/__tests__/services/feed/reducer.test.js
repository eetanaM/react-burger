import {
  feedReducer,
  initialState,
  wsError,
  wsMessage,
} from "../../../services/feed/slice";

describe("Feed reducers tests", () => {
  const UNKNOWN_ACTION = "UNKNOWN_ACTION";

  it("should return initial state with EMPTY action passed", () => {
    expect(feedReducer({ ...initialState }, {})).toEqual({ ...initialState });
  });

  it("should return initial state with UNKNOWN action passed", () => {
    expect(feedReducer({ ...initialState }, { type: UNKNOWN_ACTION })).toEqual({
      ...initialState,
    });
  });

  it("should handle wsError action", () => {
    expect(
      feedReducer(
        { ...initialState },
        { type: wsError.type, payload: "Error occured" }
      )
    ).toEqual({ ...initialState, connectionError: "Error occured" });
  });

  it("should handle wsMessage action", () => {
    const mockMessage = {
      success: true,
      orders: [
        { number: 1, name: "Order 1" },
        { number: 2, name: "Order 2" },
        { number: 3, name: "Order 3" },
        { number: 4, name: "Order 4" },
      ],
      total: 12345,
      totalToday: 123,
    };

    expect(
      feedReducer(
        { ...initialState },
        { type: wsMessage.type, payload: mockMessage }
      )
    ).toEqual({ ...mockMessage, connectionError: null });
  });
});
