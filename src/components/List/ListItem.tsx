import { useState } from 'react';
import './ListItem.css';

export interface ListItemProps {
    listName: string;
    complete:boolean;
    editing:boolean;
    id:number;
    setEditIndividualItem: (IndexToEdit:number) => void
    editIndividualItem: (IdToEdit:number, NewListName:string) => void
    deleteIndividualItem: (IdToDelete:number) => void
    toggleCheckBox:(IdToToggle:number) => void
}

//Component for an individual list item, receiving props for the list name (what the item is called) and whether it's completed or not
export default function ListItem({
    listName,
    complete,
    editing,
    id,
    setEditIndividualItem,
    editIndividualItem,
    deleteIndividualItem,
    toggleCheckBox,
}:ListItemProps) {
    // state to keep track of current value in text box (the list item name)
    const [currentListName, setCurrentListName] = useState(listName);

    //function to change the local state after user clicks the 'save changes' button
    function editCurrentListName(element: React.ChangeEvent<HTMLInputElement>) {
        setCurrentListName(element.target.value)
    }
    return (
    <div className="list-item">
        <input type="checkbox" checked={complete} onChange={() => toggleCheckBox(id)} />
        {editing ? (
        <>
            <input 
                type="text" 
                value={currentListName} 
                onChange={editCurrentListName}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        editIndividualItem(id, currentListName);
                    }
                }} 
            />
            <button onClick={() => editIndividualItem(id, currentListName)}>Save 💾</button>
        </>
        ) : (
        <>
            <span style={{ textDecoration: complete ? 'line-through' : 'none' }}>{listName}</span>
            <button onClick={() => setEditIndividualItem(id)}>Edit ✏️</button>
        </>
        )}
        <button onClick={() => deleteIndividualItem(id)}>Delete 🗑️</button>
    </div>
    );
}