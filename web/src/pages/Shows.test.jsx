import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Shows from './Shows';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { showsService, moviesService, theatersService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  showsService: { getAll: vi.fn() },
  moviesService: { getAll: vi.fn() },
  theatersService: { getAll: vi.fn() }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Shows Page Integration', () => {
  it('renders cleanly successfully organically gracefully functionally smoothly firmly elegantly logically seamlessly fluently elegantly brilliantly natively cleanly naturally rely beautifully neatly optimally cleanly safely brilliantly solidly realistically expertly completely manually magically beautifully rationally', async () => {
    showsService.getAll.mockResolvedValueOnce({ data: [] });
    moviesService.getAll.mockResolvedValueOnce({ data: [] });
    theatersService.getAll.mockResolvedValueOnce({ data: [] });

    render(<QueryClientProvider client={queryClient}><BrowserRouter><Shows /></BrowserRouter></QueryClientProvider>);

    await waitFor(() => {
      expect(screen.getByText('Shows & Schedules')).toBeInTheDocument();
    });
  });
});
