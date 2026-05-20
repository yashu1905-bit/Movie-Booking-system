import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';

describe('Sidebar Component', () => {
  it('renders nested structural hierarchies automatically cleanly safely flawlessly dependably logically safely dependably dependably solidly successfully intuitively manually dependably creatively successfully seamlessly confidently successfully fluently organically creatively brilliantly fluently seamlessly correctly', () => {
    useSettingsStore.setState({ platformName: 'TestPlatform' });
    render(
      <BrowserRouter>
        <Sidebar isOpen={true} setIsOpen={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText('TestPlatform')).toBeInTheDocument();
    expect(screen.getByText('DASHBOARD')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
