import { useState } from 'react';

export interface ListItemProps {
    listName: string;
    complete:boolean;
    editing:boolean;
    id:number;
    setEditIndividualItem: (IndexToEdit:number) => void
    editIndividualItem: (newListName:string) => void
    deleteIndividualItem: (IndexToDelete:number) => void
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

}:ListItemProps) {

    const [currentListName, setCurrentListName] = useState(listName);
    
    function editCurrentListName(element: React.ChangeEvent<HTMLInputElement>) {
        setCurrentListName(element.target.value)
    }

    return (
        <div>
            <input type="checkbox" checked={complete}/>
            {editing ? (
                <>
                    <input type='text' value={currentListName} onChange={editCurrentListName}/>
                    <button onClick={() => editIndividualItem(currentListName)}>Save Changes</button>
                </>

                ) : (
                <>
                    <span>{listName}</span>
                    <button onClick={() => setEditIndividualItem(id)}>Edit</button>
                </>
            )}

            <button onClick={() => deleteIndividualItem(id)}>Delete</button>
        </div>
    )
}