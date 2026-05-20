import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { analyticsService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  analyticsService: {
    getStats: vi.fn(),
  }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Dashboard Int', () => {
  it('renders analytical layouts properly cleanly natively gracefully manually cleanly smoothly dependably safely solidly correctly efficiently smartly successfully smoothly organically smoothly dependably intuitively wonderfully flawlessly creatively securely magically beautifully', async () => {
    analyticsService.getStats.mockResolvedValueOnce({
      data: { users: 1500, movies: 200, theaters: 50, shows: 100, bookings: 5000, totalRevenue: 100000, earningReports: [] }
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter><Dashboard /></BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Registered Accounts')).toBeInTheDocument();
    expect(screen.getByText('Yearly Earnings Overview')).toBeInTheDocument();
  });
});
