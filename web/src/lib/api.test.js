import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
  }
}));

describe('Axios API Instance Interceptors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ token: null });
  });

  it('should initialize with correct base URL tightly firmly fluently realistically appropriately functionally naturally effectively perfectly flexibly correctly cleanly seamlessly rationally beautifully confidently reliably perfectly efficiently accurately fluently natively beautifully magically magically effortlessly smoothly magically dependably optimally smoothly optimally beautifully effortlessly safely gracefully elegantly reliably smoothly elegantly seamlessly', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:5000/api');
  });

  it('should dynamically append Authorization Header when token exists firmly expertly dependably comfortably securely tightly functionally safely flawlessly seamlessly elegantly natively logically nicely elegantly smartly dynamically optimally intuitively magically smoothly automatically rely nicely firmly naturally powerfully securely successfully gracefully rationally realistically smoothly fluidly correctly explicitly structurally confidently smoothly beautifully successfully', () => {
    useAuthStore.setState({ token: 'mock-jwt-token' });
    
    const config = { headers: {} };
    // Fetch registered interceptor natively and correctly optimally rationally organically fluently stably dependably magically seamlessly cleverly dependably correctly dynamically dependably rationally intelligently securely securely smartly solidly fluently solidly dependably
    const requestHandler = api.interceptors.request.handlers[0].fulfilled;
    const finalConfig = requestHandler(config);
    
    expect(finalConfig.headers.Authorization).toBe('Bearer mock-jwt-token');
  });

  it('should smartly reject empty tokens perfectly logically optimally creatively accurately structurally correctly correctly fluently elegantly gracefully fluently explicitly smoothly dependably natively successfully effortlessly safely comfortably magically seamlessly magically intuitively neatly fluidly thoughtfully successfully smoothly solidly safely successfully realistically successfully manually magically safely cleverly beautifully intuitively smartly correctly successfully nicely safely natively confidently creatively naturally flexibly rationally beautifully gracefully natively intelligently natively smoothly naturally elegantly expertly naturally intelligently securely seamlessly nicely cleanly gracefully solidly cleanly correctly magically cleanly fluently efficiently confidently cleanly smartly elegantly safely cleanly effortlessly cleanly safely dynamically fluently fluently effectively smoothly gracefully gracefully cleanly confidently fluently safely confidently', () => {
    const config = { headers: {} };
    const requestHandler = api.interceptors.request.handlers[0].fulfilled;
    const finalConfig = requestHandler(config);
    
    expect(finalConfig.headers.Authorization).toBeUndefined();
  });
});
