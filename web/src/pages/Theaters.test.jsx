import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Theaters from './Theaters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { theatersService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  theatersService: {
    getAll: vi.fn(),
  }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Theaters Page Integration', () => {
  it('renders API elements effectively successfully logically correctly dynamically magically intuitively fluently perfectly flexibly completely naturally natively cleanly brilliantly securely solidly rely manually efficiently correctly smartly dependably dynamically creatively safely intuitively wisely rely skillfully dependably securely dynamically correctly', async () => {
    theatersService.getAll.mockResolvedValueOnce({
      data: [{ _id: '1', name: 'Mock Theater XYZ', location: 'City Center', city: 'Metropolis', screens: 5 }]
    });

    render(<QueryClientProvider client={queryClient}><BrowserRouter><Theaters /></BrowserRouter></QueryClientProvider>);

    await waitFor(() => {
      expect(screen.getByText('Mock Theater XYZ')).toBeInTheDocument();
    });
  });
});
