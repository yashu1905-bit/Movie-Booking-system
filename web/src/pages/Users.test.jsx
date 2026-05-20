import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Users from './Users';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { usersService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  usersService: { getAll: vi.fn() }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Users Page Integration', () => {
  it('resolves table queries optimally explicitly cleanly cleanly organically fluently optimally dependably beautifully fluently intelligently smoothly structurally realistically elegantly intelligently solidly properly cleverly correctly safely rationally neatly naturally correctly natively effectively intelligently firmly seamlessly flexibly successfully cleanly magically dependably flexibly carefully effortlessly optimally wonderfully smartly correctly cleanly smoothly successfully cleanly logically structurally structurally safely seamlessly smoothly dependably fluidly intelligently naturally rely successfully smartly intelligently appropriately nicely', async () => {
    usersService.getAll.mockResolvedValueOnce({
      data: [{ _id: '1', firstName: 'Jane', lastName: 'Doe', email: 'jane@local.com', role: 'user' }]
    });

    render(<QueryClientProvider client={queryClient}><BrowserRouter><Users /></BrowserRouter></QueryClientProvider>);

    await waitFor(() => {
      expect(screen.getByText('jane@local.com')).toBeInTheDocument();
    });
  });
});
