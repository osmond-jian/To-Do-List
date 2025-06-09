import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi, beforeEach} from 'vitest'

//tests for all of the core feature functions in the main app page 
describe('App - full to-do list functionality', () => {
    //this will clear mocks and local storage so the tests dont interfere with each other
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();

        // Add a starting list item so the other tests can work
        const starterListItem = [{
            listName: 'Sample List Item 1',
            complete: false,
            editing: false,
            id: 0,
        }];
        localStorage.setItem('KPM-TASKS', JSON.stringify(starterListItem));
    });
    it('adds a new item', async () => {
        render(<App />);
        fireEvent.click(screen.getByText('+ Add New Item'));

        const input = screen.getByLabelText(/list item name/i);
        fireEvent.change(input, { target: { value: 'New Task' } });

        fireEvent.click(screen.getByText('Submit'));
        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    it('edits an item name', async () => {
        render(<App />);
        fireEvent.click(screen.getByText('Edit'));
        const input = screen.getByDisplayValue(/sample list item 1/i);

        fireEvent.change(input, { target: { value: 'Edited Task' } });
        fireEvent.click(screen.getByText('Save'));
        expect(screen.getByText('Edited Task')).toBeInTheDocument();
    });

    it('toggles checkbox', () => {
        render(<App />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
        it('deletes an item', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Delete'));
        expect(screen.queryByText('Sample List Item 1')).not.toBeInTheDocument();
    });

    it('saves to localStorage after adding an item', () => {
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        render(<App />);
        fireEvent.click(screen.getByText('+ Add New Item'));

        const input = screen.getByLabelText(/list item name/i);
        fireEvent.change(input, { target: { value: 'Persisted Task' } });

        fireEvent.click(screen.getByText('Submit'));

        expect(setItemSpy).toHaveBeenCalledWith(
            'KPM-TASKS', 
            expect.stringContaining('Persisted Task')
        );
    });

    it('loads list from localStorage on mount', () => {
        const fakeList = [
            { listName: 'From Storage', complete: false, editing: false, id: 0 },
        ];
        localStorage.setItem('KPM-TASKS', JSON.stringify(fakeList));

        render(<App />);
        expect(screen.getByText('From Storage')).toBeInTheDocument();
    });


});
