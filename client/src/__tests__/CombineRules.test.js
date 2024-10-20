// src/__tests__/CombineRules.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CombineRules from '../components/CombineRules';

global.fetch = jest.fn();

describe('CombineRules Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('combines rules and displays the AST', async () => {
    // Mocking the fetch response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        ruleAST: {
          type: 'operator',
          operator: 'AND',
          left: { key: 'age', operator: '>', value: '18' },
          right: { key: 'status', operator: '==', value: 'active' },
        },
        ruleName: 'CombinedRule',
      }),
    });

    render(<CombineRules />);

    // Fill in the first rule field
    fireEvent.change(screen.getByLabelText(/Rule 1:/i), {
      target: { value: 'age > 18' },
    });

    // Fill in the operator for the first rule
    fireEvent.change(screen.getByLabelText(/Operator:/i), {
      target: { value: 'AND' },
    });

    // Add another rule
    fireEvent.click(screen.getByText(/Add Another Rule/i));
    
    // Fill in the second rule field
    fireEvent.change(screen.getByLabelText(/Rule 2:/i), {
      target: { value: 'status == active' },
    });

    // Fill in the operator for the second rule
    fireEvent.change(screen.getByLabelText(/Operator:/i, { selector: 'select' }), {
      target: { value: 'OR' },
    });

    // Combine the rules
    fireEvent.click(screen.getByText(/Combine Rules/i));

    // Wait for the result to display
    const result = await screen.findByText(/Rule Name: CombinedRule/i);
    expect(result).toBeInTheDocument();

    // Check that the tree structure is displayed correctly
    expect(screen.getByText(/age > 18/i)).toBeInTheDocument();
    expect(screen.getByText(/status == active/i)).toBeInTheDocument();
  });

  it('displays an error if fetch fails', async () => {
    // Mocking the fetch to simulate a failure
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<CombineRules />);

    // Fill in the first rule field
    fireEvent.change(screen.getByLabelText(/Rule 1:/i), {
      target: { value: 'age > 18' },
    });

    // Combine the rules
    fireEvent.click(screen.getByText(/Combine Rules/i));

    // Expecting some kind of error handling to be implemented
    // Adjust this expectation based on how you want to handle errors in your component
    const errorMessage = await screen.findByText(/Error combining rules/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
