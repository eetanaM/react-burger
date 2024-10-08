import {
  configureUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../../services/profile/actions";
import {
  profileReducer,
  initialState,
  resetUser,
} from "../../../services/profile/slice";

const mockUser = {
  email: "test@example.com",
  name: "test",
};

describe("Profile reducers tests", () => {
  const UNKNOWN_ACTION = "UNKNOWN_ACTION";

  it("should return initial state with EMPTY action passed", () => {
    expect(profileReducer({ ...initialState }, {})).toEqual({
      ...initialState,
    });
  });

  it("should return initial state with UNKNOWN action passed", () => {
    expect(
      profileReducer({ ...initialState }, { type: UNKNOWN_ACTION })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle resetUser action", () => {
    expect(
      profileReducer({ ...initialState }, { type: resetUser.type })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle registerUser.fulfilled action", () => {
    expect(
      profileReducer(
        { ...initialState },
        { type: registerUser.fulfilled.type, payload: { user: mockUser } }
      )
    ).toEqual({
      ...initialState,
      authError: null,
      user: mockUser,
      isAuthChecked: true,
    });
  });

  it("should handle registerUser.rejected action", () => {
    const mockError = "Error occured";

    expect(
      profileReducer(
        { ...initialState },
        { type: registerUser.rejected.type, error: mockError }
      )
    ).toEqual({
      ...initialState,
      authError: mockError,
      user: null,
      isAuthChecked: true,
    });
  });

  it("should handle loginUser.fulfilled action", () => {
    expect(
      profileReducer(
        { ...initialState },
        { type: loginUser.fulfilled.type, payload: { user: mockUser } }
      )
    ).toEqual({
      ...initialState,
      authError: null,
      user: mockUser,
      isAuthChecked: true,
    });
  });

  it("should handle loginUser.rejected action", () => {
    const mockError = "Error occured";

    expect(
      profileReducer(
        { ...initialState },
        { type: loginUser.rejected.type, error: mockError }
      )
    ).toEqual({
      ...initialState,
      authError: mockError,
      user: null,
      isAuthChecked: true,
    });
  });

  it("should handle getUser.fulfilled action", () => {
    expect(
      profileReducer(
        { ...initialState },
        { type: getUser.fulfilled.type, payload: { user: mockUser } }
      )
    ).toEqual({
      ...initialState,
      authError: null,
      user: mockUser,
      isAuthChecked: true,
    });
  });

  it("should handle getUser.rejected action", () => {
    const mockError = "Error occured";

    expect(
      profileReducer(
        { ...initialState },
        { type: getUser.rejected.type, error: mockError }
      )
    ).toEqual({
      ...initialState,
      authError: mockError,
      user: null,
      isAuthChecked: true,
    });
  });

  it("should handle logoutUser.fulfilled action", () => {
    expect(
      profileReducer(
        { ...initialState, user: mockUser },
        { type: logoutUser.fulfilled.type }
      )
    ).toEqual(initialState);
  });

  it("should handle configureUser.fulfilled action", () => {
    expect(
      profileReducer(
        { ...initialState },
        { type: configureUser.fulfilled.type, payload: { user: mockUser } }
      )
    ).toEqual({
      ...initialState,
      authError: null,
      user: mockUser,
    });
  });

  it("should handle configureUser.rejected action", () => {
    const mockError = "Error occured";

    expect(
      profileReducer(
        { ...initialState },
        { type: configureUser.rejected.type, error: mockError }
      )
    ).toEqual({
      ...initialState,
      authError: mockError,
    });
  });
});
