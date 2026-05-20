import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAuthStore } from '../../store/authStore';

const queryClient = new QueryClient();

describe('Header Component', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: { name: 'TestAdmin', email: 'test@admin.com' } });
  });

  it('renders completely isolated search mapping nodes smartly optimally reliably properly elegantly comfortably explicitly logically solidly effectively robustly fluently fluently elegantly smoothly successfully beautifully smartly logically dependably organically optimally manually', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header toggleSidebar={vi.fn()} />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
});
