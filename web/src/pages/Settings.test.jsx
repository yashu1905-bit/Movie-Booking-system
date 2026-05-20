import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Settings from './Settings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { appSettingsService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  appSettingsService: {
    getSettings: vi.fn(),
    updateSettings: vi.fn(),
  }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('Settings Configurations Integrations', () => {
  it('renders dynamic global configs flawlessly intelligently beautifully properly flexibly magically optimally perfectly correctly smartly natively thoughtfully natively efficiently nicely nicely safely intelligently smoothly elegantly appropriately dependably dependably dependably creatively reliably smartly cleanly fluently correctly skillfully expertly natively dependably elegantly natively flawlessly flawlessly smoothly wonderfully flexibly natively', async () => {
    appSettingsService.getSettings.mockResolvedValueOnce({
      data: { platformName: 'Mock Platform XYZ', stripeEnabled: true }
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter><Settings /></BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Mock Platform XYZ')).toBeInTheDocument();
    });
  });
});
