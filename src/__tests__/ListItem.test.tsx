/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../components/List/ListItem';
import { expect, describe, it, vi } from 'vitest';

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

    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith(99);
  });
});
