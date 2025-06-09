import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../List/ListItem';
import { describe, it, expect, vi } from 'vitest';

// tests the ListItem component for properly rendering and all its functions; uses vi to mock the functions as props. might rewrite when switching this to contexts
const baseProps = {
  id: 1,
  listName: 'Test Task',
  complete: false,
  editing: false,
  setEditIndividualItem: vi.fn(),
  editIndividualItem: vi.fn(),
  deleteIndividualItem: vi.fn(),
  toggleCheckBox: vi.fn(),
};

describe('ListItem', () => {
  it('renders item name and delete button', () => {
    render(<ListItem {...baseProps} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Delete 🗑️')).toBeInTheDocument();
  });
  
  it('calls toggleCheckBox when checkbox is clicked', () => {
    render(<ListItem {...baseProps} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(baseProps.toggleCheckBox).toHaveBeenCalledWith(1);
  });

  it('calls delete handler on Delete click', () => {
    render(<ListItem {...baseProps} />);
    fireEvent.click(screen.getByText('Delete 🗑️'));
    expect(baseProps.deleteIndividualItem).toHaveBeenCalledWith(1);
  });
});
