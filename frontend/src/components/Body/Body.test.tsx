import React from 'react';
import { render, screen } from '@testing-library/react';
import Body from './Body';

test('renders learn react link', () => {
  render(<Body />);
  const linkElement = screen.getByText(/I am body/i);
  expect(linkElement).toBeInTheDocument();
});
