import { render, screen, fireEvent } from '@testing-library/react';
import AddNewItemModal from '../AddNewItemModal/AddNewItemModal';
import {describe, it, expect, vi} from 'vitest';

describe('AddNewItemModal', () => {
    it('calls setNewItemState with input value', () => {
        const mockSetNewItem = vi.fn();
        render(<AddNewItemModal setNewItemState={mockSetNewItem} />);

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'New Task' },
        });
        fireEvent.click(screen.getByText('Submit'));

        expect(mockSetNewItem).toHaveBeenCalledWith('New Task');
    });
});
