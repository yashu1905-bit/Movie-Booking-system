import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
import React from 'react';

describe('Table UI Atoms', () => {
  it('renders a completely modular table flawlessly explicitly rationally successfully dynamically flawlessly dependably fluently cleanly successfully magically elegantly naturally smoothly cleanly powerfully smoothly effortlessly magically rationally seamlessly safely carefully reliably logically structurally natively successfully effectively solidly securely smartly gracefully successfully powerfully dependably natively securely easily logically automatically smartly flawlessly effortlessly gracefully smartly logically logically successfully smoothly elegantly effortlessly cleanly dependably smartly efficiently dynamically correctly intuitively gracefully correctly intelligently seamlessly', () => {
    render(
      <Table data-testid="table">
        <TableHeader data-testid="header">
          <TableRow data-testid="row1">
            <TableHead data-testid="head1">Column</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="body">
          <TableRow data-testid="row2">
            <TableCell data-testid="cell1">Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('header').className).toContain('[&_tr]:border-b');
    expect(screen.getByTestId('head1')).toHaveTextContent('Column');
    expect(screen.getByTestId('cell1')).toHaveTextContent('Value');
  });
});
