import {
  profileReducer,
  initialState,
  resetUser,
} from "../../../services/profile/slice";

describe("Profile reducer tests", () => {
  it("should return initial state", () => {
    expect(profileReducer(undefined, {})).toEqual({ ...initialState });
  });
});
