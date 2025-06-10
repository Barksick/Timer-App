import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfileButton from './UserProfileButton';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('UserProfileButton component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders button with correct text', () => {
    render(
      <MemoryRouter>
        <UserProfileButton />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /user profile/i });
    expect(button).toBeInTheDocument();
  });

  test('navigates to /profile on click', async () => {
    render(
      <MemoryRouter>
        <UserProfileButton />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /user profile/i });
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
});
