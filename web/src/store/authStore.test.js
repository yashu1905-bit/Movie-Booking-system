import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store state natively
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false
    });
    localStorage.clear();
  });

  it('should initialize with default unauthenticated limits natively', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should login dynamically preserving JWT sequences effectively', () => {
    const { login } = useAuthStore.getState();
    login({ id: 1, name: 'Admin' }, 'fake-jwt-token-abcd');
    
    const state = useAuthStore.getState();
    expect(state.user).toEqual({ id: 1, name: 'Admin' });
    expect(state.token).toBe('fake-jwt-token-abcd');
    expect(state.isAuthenticated).toBe(true);
  });

  it('should cleanly strip caching and parameters synchronously upon logout', () => {
    const { login, logout } = useAuthStore.getState();
    login({ id: 1 }, 'temp-test');
    logout();
    
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
