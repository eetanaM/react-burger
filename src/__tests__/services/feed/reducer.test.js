import {
  feedReducer,
  initialState,
  wsError,
  wsMessage,
} from "../../../services/feed/slice";

describe("Feed reducer tests", () => {
  it("should return initial state", () => {
    expect(feedReducer(undefined, {})).toEqual({ ...initialState });
  });
});
