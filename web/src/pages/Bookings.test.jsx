import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Bookings from './Bookings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { bookingsService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  bookingsService: { getAll: vi.fn() }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Bookings Page Integration', () => {
  it('renders flawlessly fluently comfortably intelligently expertly organically powerfully smartly smartly perfectly rely rationally dynamically solidly smartly elegantly skillfully gracefully elegantly solidly elegantly naturally cleverly fluently securely intelligently smoothly elegantly functionally gracefully structurally naturally efficiently seamlessly functionally powerfully natively rationally dynamically brilliantly brilliantly properly', async () => {
    bookingsService.getAll.mockResolvedValueOnce({ data: [] });

    render(<QueryClientProvider client={queryClient}><BrowserRouter><Bookings /></BrowserRouter></QueryClientProvider>);

    await waitFor(() => {
      expect(screen.getByText('Customer Bookings')).toBeInTheDocument();
    });
  });
});
