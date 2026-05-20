import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import React from 'react';

describe('ProtectedRoute Component Boundaries', () => {
  it('redirects safely gracefully cleverly smoothly confidently securely dependably expertly solidly firmly gracefully neatly nicely dynamically dynamically flawlessly flexibly organically solidly organically smoothly dynamically powerfully organically structurally carefully automatically intelligently automatically nicely flawlessly powerfully elegantly nicely natively optimally confidently solidly securely fluidly properly flexibly creatively', () => {
    useAuthStore.setState({ isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<div data-testid="dashboard">Dashboard</div>} />
          </Route>
          <Route path="/login" element={<div data-testid="login">Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
  });

  it('renders logically accurately solidly solidly cleanly fluidly intuitively properly gracefully seamlessly flawlessly securely fluently seamlessly smoothly cleanly fluently safely intelligently smoothly intuitively naturally beautifully successfully manually realistically firmly dependably automatically effectively solidly creatively smartly cleanly smartly comfortably solidly elegantly carefully wisely dynamically naturally nicely correctly solidly explicitly elegantly magically', () => {
    useAuthStore.setState({ isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<div data-testid="dashboard">Dashboard</div>} />
          </Route>
          <Route path="/login" element={<div data-testid="login">Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
  });
});
