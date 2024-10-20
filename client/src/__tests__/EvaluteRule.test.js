// src/__tests__/EvaluateRule.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EvaluateRule from '../components/EvaluateRule';

global.fetch = jest.fn();

describe('EvaluateRule Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('evaluates a rule and displays the result', async () => {
    // Mocking the fetch response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: true, // Simulated result from the server
      }),
    });

    render(<EvaluateRule />);

    // Fill in the AST input field
    fireEvent.change(screen.getByLabelText(/Rule Name:/i), {
      target: { value: '{"type":"operator","operator":"AND","left":{"key":"age","operator":">","value":"18"},"right":{"key":"status","operator":"==","value":"active"}}}' },
    });

    // Fill in the Data JSON input field
    fireEvent.change(screen.getByLabelText(/Data JSON:/i), {
      target: { value: '{"age": 20, "status": "active"}' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Evaluate Rule/i));

    // Wait for the result to display
    const result = await screen.findByText(/true/i);
    expect(result).toBeInTheDocument();
  });

  it('displays an error if fetch fails', async () => {
    // Mocking the fetch to simulate a failure
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<EvaluateRule />);

    // Fill in the AST input field
    fireEvent.change(screen.getByLabelText(/Rule Name:/i), {
      target: { value: '{"type":"operator","operator":"AND","left":{"key":"age","operator":">","value":"18"},"right":{"key":"status","operator":"==","value":"active"}}}' },
    });

    // Fill in the Data JSON input field
    fireEvent.change(screen.getByLabelText(/Data JSON:/i), {
      target: { value: '{"age": 20, "status": "active"}' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Evaluate Rule/i));

    // Expecting some kind of error handling to be implemented
    // Adjust this expectation based on how you want to handle errors in your component
    const errorMessage = await screen.findByText(/Error evaluating rule/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
