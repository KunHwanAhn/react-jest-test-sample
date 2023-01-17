import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from './Index';

describe('Index', () => {
  it('Index render', () => {
    render(<Index />);
  });

  it('Hello World text render', () => {
    render(<Index />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('sum result display', () => {
    render(<Index />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
