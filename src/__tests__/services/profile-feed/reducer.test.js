import {
  profileFeedReducer,
  initialState,
  profileWsError,
  profileWsMessage,
} from "../../../services/profile-feed/slice";

describe("Profile feed reducer tests", () => {
  it("should return initial state", () => {
    expect(profileFeedReducer(undefined, {})).toEqual({ ...initialState });
  });
});
