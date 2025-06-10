import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import PrivateRoute from "./PrivateRoute";

function renderWithStoreAndRouter({ initialState, initialRoute = "/protected" }) {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: initialState },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <div>Protected Content</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe("PrivateRoute", () => {
  test("renders children when user is authenticated", () => {
    renderWithStoreAndRouter({
      initialState: { currentUser: { username: "testuser" }, users: [] },
    });

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to /login when user is not authenticated", () => {
    renderWithStoreAndRouter({
      initialState: { currentUser: null, users: [] },
    });

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
