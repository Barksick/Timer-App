import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AboutAppButton from './AboutAppButton';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AboutAppButton component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders button with correct text', () => {
    render(
      <MemoryRouter>
        <AboutAppButton />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /about app/i });
    expect(button).toBeInTheDocument();
  });

  test('navigates to /about on click', async () => {
    render(
      <MemoryRouter>
        <AboutAppButton />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /about app/i });
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
