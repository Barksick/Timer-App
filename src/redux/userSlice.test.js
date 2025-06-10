import userReducer, { registerUser, loginUser, logoutUser } from "./userSlice";

describe("userSlice", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      currentUser: null,
      users: [],
    };

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should handle registerUser", () => {
    const newUser = { email: "test@example.com", password: "1234" };
    const nextState = userReducer(initialState, registerUser(newUser));

    expect(nextState.users).toContainEqual(newUser);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "users",
      JSON.stringify([newUser])
    );
  });

  test("should handle loginUser with valid credentials", () => {
    const user = { email: "john@example.com", password: "pass" };
    const preloadedState = {
      currentUser: null,
      users: [user],
    };

    const action = loginUser({ email: "john@example.com", password: "pass" });
    const nextState = userReducer(preloadedState, action);

    expect(nextState.currentUser).toEqual(user);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "currentUser",
      JSON.stringify(user)
    );
  });

  test("should not login with invalid credentials", () => {
    const user = { email: "john@example.com", password: "pass" };
    const preloadedState = {
      currentUser: null,
      users: [user],
    };

    const action = loginUser({ email: "john@example.com", password: "wrong" });
    const nextState = userReducer(preloadedState, action);

    expect(nextState.currentUser).toBeNull();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test("should handle logoutUser", () => {
    const preloadedState = {
      currentUser: { email: "john@example.com", password: "pass" },
      users: [],
    };

    const nextState = userReducer(preloadedState, logoutUser());

    expect(nextState.currentUser).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith("currentUser");
  });
});
