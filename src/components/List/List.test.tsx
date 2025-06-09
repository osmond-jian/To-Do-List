/// <reference types="vitest" />
import { render, screen} from '@testing-library/react';
import List from '../List/List';
import { expect, describe, it, vi } from 'vitest';

//test for the List component, making sure it renders ListItems
const baseProps = {
    listItems: [
        {
            listName:"This is ListItem #1",
            complete:false,
            editing:false,
            id:1,
        },
        {
            listName:"This is ListItem #2",
            complete:false,
            editing:false,
            id:2,
        },
    ],
    setEditIndividualItem: vi.fn(),
    editIndividualItem: vi.fn(),
    deleteIndividualItem: vi.fn(),
    toggleCheckBox:vi.fn(),
    setListItems:vi.fn(),
}

//check to see if two listItems are rendered properly
describe('List', () => {
    it('renders two listItems when given two listItem props', () => {
        render(<List {...baseProps}/>);
        expect(screen.getByText('This is ListItem #1'));
        expect(screen.getByText('This is ListItem #2'));
    });

})
