import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import store from '../redux/store';

const renderWithProvidersAndRouter = (ui) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={ui} />
          <Route path="/timer" element={<div>Timer Page</div>} />
          <Route path="/register" element={<div>Register Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('LoginPage', () => {
  test('renders email and password fields and login button', () => {
    renderWithProvidersAndRouter(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('shows error on invalid login', () => {
    renderWithProvidersAndRouter(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });

  test('navigates to register page on button click', () => {
    renderWithProvidersAndRouter(<LoginPage />);
    fireEvent.click(screen.getByRole('button', { name: /account registration/i }));
    expect(screen.getByText(/register page/i)).toBeInTheDocument();
  });

  test('successful login navigates to /timer', () => {
    store.dispatch({
      type: 'user/registerUser',
      payload: { email: 'test@example.com', password: '123456' }
    });

    renderWithProvidersAndRouter(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText(/timer page/i)).toBeInTheDocument();
  });
});
