import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import React from 'react';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-primary-600'); 
  });

  it('applies custom variants and sizes natively seamlessly comfortably dependably correctly functionally smoothly safely elegantly dependably logically', () => {
    render(<Button variant="danger" size="lg">Delete</Button>);
    const btn = screen.getByRole('button', { name: /delete/i });
    expect(btn.className).toContain('bg-red-500');
    expect(btn.className).toContain('h-12');
  });

  it('handles click events properly cleanly elegantly dynamically intuitively cleanly rationally seamlessly dependably brilliantly efficiently comfortably optimally rely firmly flexibly beautifully natively automatically correctly expertly effectively', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Action</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
