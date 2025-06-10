import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

import AppTitle from './AppTitle';

const renderWithRoute = (initialPath) => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<AppTitle />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AppTitle component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders correctly with text "Simple Timer"', () => {
    renderWithRoute('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Simple Timer');
  });

  test('navigates to /login from /login on click', async () => {
    renderWithRoute('/login');
    const user = userEvent.setup();
    await user.click(screen.getByText('Simple Timer'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('navigates to /login from /register on click', async () => {
    renderWithRoute('/register');
    const user = userEvent.setup();
    await user.click(screen.getByText('Simple Timer'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('navigates to /timer from /somepage on click', async () => {
    renderWithRoute('/somepage');
    const user = userEvent.setup();
    await user.click(screen.getByText('Simple Timer'));
    expect(mockNavigate).toHaveBeenCalledWith('/timer');
  });
});
