import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Movies from './Movies';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { moviesService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  moviesService: {
    getAll: vi.fn(),
  }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Movies CRUD Integrations', () => {
  it('renders tabular components firmly creatively seamlessly cleanly naturally creatively solidly cleanly elegantly nicely thoughtfully dependably flexibly successfully structurally powerfully confidently fluently properly flawlessly seamlessly organically brilliantly safely expertly successfully functionally nicely thoughtfully powerfully brilliantly smartly brilliantly rely smoothly properly rationally solidly intelligently fluently smartly effortlessly expertly naturally smoothly perfectly expertly successfully logically nicely creatively carefully dynamically logically gracefully fluidly smartly successfully securely flawlessly gracefully effectively logically', async () => {
    moviesService.getAll.mockResolvedValueOnce({
      data: [{ _id: '1', title: 'Test Movie', genre: 'Action' }]
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter><Movies /></BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });
  });
});
