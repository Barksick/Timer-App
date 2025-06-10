import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';

describe('Logo component', () => {
  test('renders image with correct alt text', () => {
    render(<Logo />);
    const image = screen.getByAltText('Logo');
    expect(image).toBeInTheDocument();
  });

  test('image has correct src', () => {
    render(<Logo />);
    const image = screen.getByAltText('Logo');
    expect(image.src).toMatch(/logo2\.png$/);
  });

  test('image has correct styles', () => {
    render(<Logo />);
    const image = screen.getByAltText('Logo');
    expect(image).toHaveStyle({
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      maxHeight: '300px',
      objectFit: 'contain',
      marginTop: '-20px',
    });
  });
});
