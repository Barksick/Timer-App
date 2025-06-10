import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutAppPage from './AboutAppPage';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';

const renderWithProvidersAndRouter = (ui) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe('AboutAppPage', () => {
  test('renders About App title', () => {
    renderWithProvidersAndRouter(<AboutAppPage />);
    expect(screen.getByRole('heading', { name: /About App/i, level: 4 })).toBeInTheDocument();
  });

  test('renders description text', () => {
    renderWithProvidersAndRouter(<AboutAppPage />);
    expect(
      screen.getByText(/This app is designed to help you keep track of time/i)
    ).toBeInTheDocument();
  });

  test('renders AppTitle and at least two buttons', () => {
    renderWithProvidersAndRouter(<AboutAppPage />);
    expect(screen.getByText(/Simple Timer/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2);
  });
});
