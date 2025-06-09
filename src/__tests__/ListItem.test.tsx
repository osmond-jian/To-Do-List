/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../components/List/ListItem';
import { expect, describe, it, vi } from 'vitest';

//this was the first test file I wrote and I just left it in here. I wanted to add edge cases here in the future that go beyond basic functionality of each component
describe('ListItem', () => {
  it('renders the task name and checkbox', () => {
    render(
      <ListItem
        id={1}
        listName="Write tests"
        complete={false}
        editing={false}
        setEditIndividualItem={() => {}}
        editIndividualItem={() => {}}
        deleteIndividualItem={() => {}}
        toggleCheckBox={() => {}}
      />
    );

    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls delete function with correct ID', () => {
    const mockDelete = vi.fn();

    render(
      <ListItem
        id={99}
        listName="Delete me"
        complete={false}
        editing={false}
        setEditIndividualItem={() => {}}
        editIndividualItem={() => {}}
        deleteIndividualItem={mockDelete}
        toggleCheckBox={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Delete 🗑️'));
    expect(mockDelete).toHaveBeenCalledWith(99);
  });
});
