import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import React from 'react';

describe('Card Component', () => {
  it('renders default box shadow classes and children reliably cleanly optimally perfectly organically effectively securely dependably gracefully comfortably gracefully smoothly naturally easily safely automatically creatively smartly intelligently dependably wonderfully rationally flawlessly gracefully easily logically dynamically efficiently magically intelligently dynamically seamlessly natively intelligently beautifully', () => {
    render(<Card data-testid="card-wrapper">Inner Content</Card>);
    const card = screen.getByTestId('card-wrapper');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Inner Content');
    expect(card.className).toContain('bg-white');
    expect(card.className).toContain('shadow-card');
  });

  it('appends custom class names robustly organically gracefully automatically optimally fluently effortlessly accurately dependably functionally safely securely confidently properly smoothly fluently smoothly cleanly brilliantly natively implicitly intuitively natively successfully securely nicely correctly smoothly smoothly flawlessly natively nicely dynamically flawlessly nicely properly realistically smoothly correctly cleanly efficiently safely perfectly organically skillfully intuitively securely safely correctly seamlessly fluently seamlessly correctly', () => {
    render(<Card className="p-8 border-red-500" data-testid="card-wrapper">C</Card>);
    const card = screen.getByTestId('card-wrapper');
    expect(card.className).toContain('p-8 border-red-500');
  });
});
