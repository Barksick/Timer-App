import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkPage from './WorkPage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';

jest.mock('../components/AppTitle', () => () => <div>AppTitle</div>);
jest.mock('../components/Logo', () => () => <div>Logo</div>);
jest.mock('../components/TimerDisplay', () => () => <div>TimerDisplay</div>);
jest.mock('../components/UserProfileButton', () => () => <button>User Profile</button>);
jest.mock('../components/AboutAppButton', () => () => <button>About App</button>);

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState: {
      user: {
        currentUser: {
          name: 'Test User',
          sex: 'Other',
          dob: '2000-01-01',
          email: 'test@example.com',
        },
        users: [],
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
}

test('renders all main components on WorkPage', () => {
  renderWithProviders(<WorkPage />);

  expect(screen.getByText(/AppTitle/i)).toBeInTheDocument();
  expect(screen.getByText(/Logo/i)).toBeInTheDocument();
  expect(screen.getByText(/TimerDisplay/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /User Profile/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /About App/i })).toBeInTheDocument();
});
