import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import CreateRule from '../components/CreateRule'; // Adjust path as needed

global.fetch = jest.fn();

describe('CreateRule Component', () => {
  it('creates a rule and displays the AST', async () => {
    const mockAST = {
      ruleAST: { some: 'AST' },
      ruleName: 'AgeCheck',
    };
    
    fetch.mockResolvedValueOnce({
      json: async () => mockAST,
    });

    // Render component
    render(<CreateRule />);

    // Fill in form using userEvent
    userEvent.type(screen.getByText("Rule Name:"), 'AgeCheck');
    userEvent.type(screen.getByText("Rule:"), 'age > 18');
    
    // Submit form
    userEvent.click(screen.getByRole('button', { name: /Create Rule/i }));

    // Wait for the result to appear

    await waitFor(() => {
      
      expect(screen.getByText(/Rule Name: AgeCheck/)).toBeInTheDocument();
     
      // expect(screen.getByText('Rule Name: AgeCheck')).toBeInTheDocument();
      // expect(screen.getByText(/some: 'AST'/)).toBeInTheDocument(); // Verify AST is displayed
    });
  });
});
