import { useState } from 'react';
import  './AddNewItemModal.css'

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
        <div className="modal-overlay">
            <div className="modal">
                <h2>Please enter the name of the new item to be added to the list below.</h2>
                <label htmlFor='listItemInput'>List Item Name</label>
                <input 
                    id='listItemInput'
                    type='text' 
                    value={listItemName} 
                    onChange={editListName}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setNewItemState(listItemName);
                        }
                    }}
                />
                <div className="modal-actions">
                    <button onClick={() => setNewItemState(listItemName)}>Submit</button>
                    <button onClick={() => setNewItemState('')}>Cancel</button>
                </div>
            </div>
        </div>
    )
}