export interface ListItemProps {
    listName: string;
    complete:boolean;
    editing:boolean;
}

//Component for an individual list item, receiving props for the list name (what the item is called) and whether it's completed or not
export default function ListItem({
    listName,
    complete,
    editing,

}:ListItemProps) {
    return (
        <div>
            <input type="checkbox" checked={complete}/>
            {editing ? (
                <input type='text' value={listName}/>
                ) : (
                <span>{listName}</span>
            )}
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}