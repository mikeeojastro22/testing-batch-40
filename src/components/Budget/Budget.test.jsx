import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Budget from './Budget';

// describe(description, callback function);
describe('Budget Component', () => {
  describe('Add Expense - Successful Transaction', () => {
    test('should successfully add an expense and reduce budget', async () => {
        // Render the Budget component
        render(<Budget />);
        
        // Find input fields and button
        const expenseInput = screen.getByRole("textbox");
        const priceInput = screen.getByRole("spinbutton");
        const addButton = screen.getByText(/add expense/i);
        
        // Check initial budget
        expect(screen.getByText(/my budget: 10000/i)).toBeInTheDocument();
        
        // Enter expense details
        fireEvent.change(expenseInput, { target: { value: 'Groceries' } });
        fireEvent.change(priceInput, { target: { value: '150' } });
        
        // Click add expense button
        fireEvent.click(addButton);
        
        // Verify expense was added to the list
        await waitFor(() => {
            expect(screen.getByText('Groceries - 150')).toBeInTheDocument();
        });
        
        // Verify budget was reduced
        await waitFor(() => {
            expect(screen.getByText(/my budget: 9850/i)).toBeInTheDocument();
        });
        
        // Verify input fields are cleared
        expect(expenseInput.value).toBe('');
        expect(priceInput.value).toBe('');
    });
  });
});
