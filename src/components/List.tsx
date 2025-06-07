import ListItem from './listItem'

interface ListProps {
    listItems: {
        listName:string;
        complete:boolean;
        editing:boolean;
        id:number;
    }[];
    setEditIndividualItem: (IndexToEdit:number) => void
    editIndividualItem: (newListName:string) => void
    deleteIndividualItem: (IndexToDelete:number) => void

}

// This is a list component, that will take in props of the entire list from state/localstorage, and map out all the ListItem components
export default function List ({
    listItems,
    setEditIndividualItem,
    editIndividualItem,
    deleteIndividualItem,
}:ListProps) {
    return(
        <div>
            {listItems.map((listObject) => (
                <ListItem
                    listName={listObject.listName}
                    complete={listObject.complete}
                    editing={listObject.editing}
                    id={listObject.id}
                    setEditIndividualItem={setEditIndividualItem}
                    editIndividualItem={editIndividualItem}
                    deleteIndividualItem={deleteIndividualItem}
                />
            ))}
        </div>
    )
}