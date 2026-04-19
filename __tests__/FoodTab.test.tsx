import { render, screen, fireEvent } from '@testing-library/react';
import FoodTab from '@/components/dashboard/FoodTab';
import React from 'react';

// Mock GA hook
jest.mock('@/lib/hooks', () => ({
  useGoogleAnalytics: () => ({
    trackEvent: jest.fn(),
  }),
}));

describe('FoodTab', () => {
  it('renders menu items and adds to cart', () => {
    render(<FoodTab />);
    
    expect(screen.getByText('🍔 Menu · Seat M24 Delivery')).toBeInTheDocument();
    
    // Add item to cart
    const addBurgerBtn = screen.getAllByRole('button', { name: /Add .* to cart/i })[0];
    fireEvent.click(addBurgerBtn);
    
    expect(screen.getByText('🛒 Your Order (1)')).toBeInTheDocument();
    
    const checkoutBtn = screen.getByRole('button', { name: /Pay via UPI/i });
    expect(checkoutBtn).toBeInTheDocument();
  });
});
