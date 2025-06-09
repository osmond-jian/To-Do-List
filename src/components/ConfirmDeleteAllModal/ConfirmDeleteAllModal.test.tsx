import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeleteAllModal from '../ConfirmDeleteAllModal/ConfirmDeleteAllModal';
import {describe, it, expect, vi} from 'vitest';

describe('calls deleteAllItems with true or false', () => {
    it('calls the deleteAllItems function when the Confirm button is pressed with true', () => {
        const mockDelete = vi.fn();
        render(<ConfirmDeleteAllModal deleteAllItems={mockDelete} />);

        fireEvent.click(screen.getByText('Confirm'));
        expect(mockDelete).toHaveBeenCalledWith(true);

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockDelete).toHaveBeenCalledWith(false);
    });

    it('calls the deleteAllItems function when the cancel button is pressed with false', () => {
        const mockDelete = vi.fn();
        render(<ConfirmDeleteAllModal deleteAllItems={mockDelete} />);

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockDelete).toHaveBeenCalledWith(false);
    });
});
