import { useState } from 'react';

export interface AddNewItemModal {
    setNewItemState: (listName:string) => void;
}

//Component for an individual list item, receiving props for the list name (what the item is called) and whether it's completed or not
export default function AddNewItemModal({
    setNewItemState
}:AddNewItemModal) {
    //state to keep track of the list name input element value
    const [listItemName, setListItemName] = useState('');

    //function to change local state when the submit button is pressed
    function editListName(element: React.ChangeEvent<HTMLInputElement>) {
        setListItemName(element.target.value)
    }

    return (
        <div>
            <h2> Please enter the name of the new item to be added to the list below. </h2>
            <label>List Item Name</label>
            <input type='text' value={listItemName} onChange={editListName} />
            {/* note that the onClicks has to be arrow functions because it needs a reference to a function, instead of directly calling a function */}
            <button onClick={() => setNewItemState(listItemName)}>Submit</button>
            <button onClick={() => setNewItemState('')}>Cancel</button>
        </div>
    )
}