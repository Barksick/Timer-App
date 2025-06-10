import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfilePage from './UserProfilePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { logoutUser } from '../redux/userSlice';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

function renderWithProvidersAndRouter(ui, { preloadedState, initialEntries = ['/profile'] } = {}) {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/profile" element={ui} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  };
}

test('renders user profile with correct data', () => {
  const preloadedState = {
    user: {
      currentUser: {
        name: 'John Doe',
        sex: 'Male',
        dob: '1990-01-01',
        email: 'john@example.com',
      },
      users: [],
    },
  };

  renderWithProvidersAndRouter(<UserProfilePage />, { preloadedState });

  const heading = screen.getByRole('heading', { name: /user profile/i });
  expect(heading).toBeInTheDocument();

  expect(screen.getByText(/Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Sex/i)).toBeInTheDocument();
  expect(screen.getByText(/Date of birth/i)).toBeInTheDocument();
  expect(screen.getByText(/Email/i)).toBeInTheDocument();

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Male')).toBeInTheDocument();
  expect(screen.getByText('1990-01-01')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

test('log out navigates to login page and dispatches logout action', async () => {
  const preloadedState = {
    user: {
      currentUser: {
        name: 'John Doe',
        sex: 'Male',
        dob: '1990-01-01',
        email: 'john@example.com',
      },
      users: [],
    },
  };

  const { store } = renderWithProvidersAndRouter(<UserProfilePage />, { preloadedState });

  const logoutButton = screen.getByRole('button', { name: /log out/i });
  await userEvent.click(logoutButton);

  expect(await screen.findByText(/login page/i)).toBeInTheDocument();

  expect(store.getState().user.currentUser).toBeNull();
});
