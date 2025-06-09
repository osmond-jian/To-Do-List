import './ConfirmDeleteAll.css'

export interface ConfirmDeleteAllModal {
    deleteAllItems: (confirmed:boolean) => void;
}

//Component for an individual list item, receiving props for the list name (what the item is called) and whether it's completed or not
export default function ConfirmDeleteAllModal({
    deleteAllItems
}:ConfirmDeleteAllModal) {
    return (
        <div className="modal-overlay">
            <div className="modal confirm-delete-modal">
                <h2>Are you sure you want to delete everything? This will permanently erase the to-do-list.</h2>
                <div className="modal-actions">
                    <button className="confirm-btn" onClick={() => deleteAllItems(true)}>Confirm</button>
                    <button className="cancel-btn" onClick={() => deleteAllItems(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}