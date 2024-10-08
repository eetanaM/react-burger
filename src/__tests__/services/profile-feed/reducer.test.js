import {
  profileFeedReducer,
  initialState,
  profileWsError,
  profileWsMessage,
} from "../../../services/profile-feed/slice";

describe("Profile feed reducers tests", () => {
  const UNKNOWN_ACTION = "UNKNOWN_ACTION";

  it("should return initial state with EMPTY action passed", () => {
    expect(profileFeedReducer({ ...initialState }, {})).toEqual({
      ...initialState,
    });
  });

  it("should return initial state with UNKNOWN action passed", () => {
    expect(profileFeedReducer({ ...initialState }, UNKNOWN_ACTION)).toEqual({
      ...initialState,
    });
  });

  it("should handle profileWsError action", () => {
    expect(
      profileFeedReducer(
        { ...initialState },
        { type: profileWsError.type, payload: "Error occured" }
      )
    ).toEqual({ ...initialState, connectionError: "Error occured" });
  });

  it("should handle profileWsMessage action", () => {
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

    let reversedOrders = [...mockMessage.orders];
    reversedOrders.reverse();

    expect(
      profileFeedReducer(
        { ...initialState },
        { type: profileWsMessage.type, payload: mockMessage }
      )
    ).toEqual({
      ...mockMessage,
      orders: reversedOrders,
      connectionError: null,
    });
  });
});
