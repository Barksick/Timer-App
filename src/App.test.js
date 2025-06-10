import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";

const renderWithProviders = (ui, { preloadedState = {}, route = "/" } = {}) => {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState,
  });

  window.history.pushState({}, "Test page", route);

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("App", () => {
  test("renders LoginPage on default route", () => {
    renderWithProviders(<App />, { route: "/" });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test("redirects to login when accessing /timer unauthenticated", () => {
    renderWithProviders(<App />, { route: "/timer" });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test("renders WorkPage when authenticated", () => {
    const mockUser = { email: "test@example.com", password: "1234" };

    renderWithProviders(<App />, {
      route: "/timer",
      preloadedState: {
        user: {
          currentUser: mockUser,
          users: [mockUser],
        },
      },
    });

    expect(screen.getByRole("heading", { name: /simple timer/i })).toBeInTheDocument();
  });
});
