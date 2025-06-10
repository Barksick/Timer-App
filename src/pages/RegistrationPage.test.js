import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationPage from './RegistrationPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';
import { MemoryRouter } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';

function renderWithProvidersAndRouter(ui, { preloadedState, initialEntries = ['/register'] } = {}) {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/register" element={ui} />
          <Route path="/login" element={<div>Log in</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}


test('renders all input fields and buttons', () => {
  renderWithProvidersAndRouter(<RegistrationPage />);

  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Sex/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Date of birth/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create an account/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Back to log in/i })).toBeInTheDocument();
});

test('shows error if required fields are missing', async () => {
  renderWithProvidersAndRouter(<RegistrationPage />);
  userEvent.click(screen.getByRole('button', { name: /Create an account/i }));
  expect(await screen.findByText(/all fields are required/i)).toBeInTheDocument();
});

test('shows error for invalid email and password', async () => {
  renderWithProvidersAndRouter(<RegistrationPage />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });

  const sexInput = screen.getByLabelText(/sex/i);
  await userEvent.click(sexInput);
  const maleOption = await screen.findByRole('option', { name: 'Male' });
  await userEvent.click(maleOption);

  fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidemail' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });

  await userEvent.click(screen.getByRole('button', { name: /Create an account/i }));
  expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
});

test('shows error for duplicate email', async () => {
  const preloadedState = {
    user: {
      currentUser: null,
      users: [{ name: 'Existing', sex: 'Male', dob: '1990-01-01', email: 'exist@example.com', password: 'Test1234!' }],
    },
  };

  renderWithProvidersAndRouter(<RegistrationPage />, { preloadedState });

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New User' } });

  const sexInput = screen.getByLabelText(/sex/i);
  await userEvent.click(sexInput);
  const maleOption = await screen.findByRole('option', { name: 'Male' });
  await userEvent.click(maleOption);

  fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '1999-01-01' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'exist@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Test1234!' } });

  await userEvent.click(screen.getByRole('button', { name: /create an account/i }));
  expect(await screen.findByText(/user with this email already exists/i)).toBeInTheDocument();
});

test('successful registration navigates to login page', async () => {
  renderWithProvidersAndRouter(<RegistrationPage />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New User' } });

  const sexInput = screen.getByLabelText(/sex/i);
  await userEvent.click(sexInput);
  const femaleOption = await screen.findByRole('option', { name: 'Female' });
  await userEvent.click(femaleOption);

  fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '1995-05-10' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newuser@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Test@1234' } });

  await userEvent.click(screen.getByRole('button', { name: /create an account/i }));

  expect(await screen.findByText(/log in/i)).toBeInTheDocument();
});

test('navigates back to login on button click', async () => {
  renderWithProvidersAndRouter(<RegistrationPage />);
  userEvent.click(screen.getByRole('button', { name: /back to log in/i }));
  expect(await screen.findByText(/log in/i)).toBeInTheDocument();
});
