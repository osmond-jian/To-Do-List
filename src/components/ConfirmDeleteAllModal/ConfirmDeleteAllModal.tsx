export interface ConfirmDeleteAllModal {
    deleteAllItems: (confirmed:boolean) => void;
}

//Component for an individual list item, receiving props for the list name (what the item is called) and whether it's completed or not
export default function ConfirmDeleteAllModal({
    deleteAllItems
}:ConfirmDeleteAllModal) {
    return (
        <div>
            <h2> Are you sure you want to delete everything? This will permanently erase the to-do-list. </h2>
            {/* note that the onClicks has to be arrow functions because it needs a reference to a function, instead of directly calling a function */}
            <button onClick={() => deleteAllItems(true)}>Confirm</button>
            <button onClick={() => deleteAllItems(false)}>Cancel</button>
        </div>
    )
}