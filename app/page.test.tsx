import React from 'react';
import { render, screen } from '@testing-library/react';
import UltraPage from './page';

describe('UltraPage', () => {
  it('renders the hero section with correct heading and description', () => {
    render(<UltraPage />);
    expect(screen.getByRole('heading', { name: /reliable medical billing/i })).toBeInTheDocument();
    expect(screen.getByText(/streamline your practice/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /get started/i })[0]).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<UltraPage />);
    expect(screen.getByText(/streamlined billing/i)).toBeInTheDocument();
    expect(screen.getByText(/compliance assurance/i)).toBeInTheDocument();
    expect(screen.getByText(/dedicated support/i)).toBeInTheDocument();
  });

  it('renders testimonials section and all testimonial cards', () => {
    render(<UltraPage />);
    expect(screen.getByRole('heading', { name: /what our clients say/i })).toBeInTheDocument();
    expect(screen.getByText(/brightwell has transformed our billing process/i)).toBeInTheDocument();
    expect(screen.getByText(/our claims are processed faster/i)).toBeInTheDocument();
    expect(screen.getByText(/the support team is always ready/i)).toBeInTheDocument();
  });

  it('renders the call to action section', () => {
    render(<UltraPage />);
    expect(screen.getByRole('heading', { name: /ready to optimize your billing/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /get started/i })[1]).toBeInTheDocument();
  });
});
