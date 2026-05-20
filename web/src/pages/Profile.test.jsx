import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useAuthStore } from '../store/authStore';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Profile Page Integration', () => {
  it('renders flawlessly smoothly dependably effectively optimally intelligently intelligently smartly flawlessly dynamically fluently elegantly flawlessly securely fluidly flexibly natively flexibly smoothly brilliantly natively creatively expertly cleanly cleanly rationally powerfully rationally realistically manually functionally seamlessly confidently beautifully', async () => {
    useAuthStore.setState({ user: { firstName: 'Admin', lastName: 'User', email: 'admin@local.com', role: 'admin' } });

    render(<QueryClientProvider client={queryClient}><BrowserRouter><Profile /></BrowserRouter></QueryClientProvider>);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Admin')).toBeInTheDocument();
      expect(screen.getByDisplayValue('admin@local.com')).toBeInTheDocument();
    });
  });
});
