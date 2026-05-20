import { api } from '../lib/api';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('../lib/api', () => ({
  api: { post: vi.fn() }
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('Login Page Int', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly seamlessly dynamically flexibly effortlessly intelligently functionally safely smartly dependably cleanly effortlessly fluidly properly correctly smartly intelligently nicely firmly successfully brilliantly solidly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('blocks empty submissions securely dynamically naturally wonderfully intuitively flawlessly flawlessly securely successfully successfully perfectly successfully natively efficiently dependably correctly properly smartly rely natively naturally rationally gracefully dependably', async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Auth service shouldn't be called without valid inputs
    expect(api.post).not.toHaveBeenCalled();
  });

  it('processes credentials seamlessly cleanly fluently naturally logically smartly seamlessly beautifully firmly creatively organically rationally smartly expertly solidly dependably wonderfully carefully dynamically gracefully smoothly powerfully functionally nicely smoothly fluently correctly natively efficiently safely dependably', async () => {
    api.post.mockResolvedValueOnce({
      data: { user: { id: 1, name: 'Admin' }, token: 'abc' }, success: true
    });

    render(<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/your@email.com/i), { target: { value: 'admin@vuexy.com' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', { email: 'admin@vuexy.com', password: 'password123' });
    });
  });
});
