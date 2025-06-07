import { useState } from 'react'
import reactLogo from './assets/react.svg'
import kpmLogo from './assets/kpmpowerLogo.png'
import './App.css'
import List from './components/List'
import ConfirmDeleteAllModal from './components/ConfirmDeleteAllModal'

interface List {
  name: string;
  id: number;
}


// Core features: add item, edit item, remove item, done (checkmark)
// structure: typescript/react, modular and maintainable/scalable
// unit tests using vitest or jest? add, edit, remove item, validating rendered output of list
// UI requirements: simple user-friendly interface, visual feedback when appropriate (when editing), add styling
// bonus- store state in local storage or backend database

function App() {
  // state used to track the list, starts off empty
  const [list, setList] = useState([{listName:'TeSt', complete:false, editing:false}]);
  //state used to track whether user is making a new item or not, will open the new item modal that allows user to input the list item name
  const [newItemModal, setNewItemModal] = useState(false);
  //state used to track whether user is deleting all items on list or not, will open a new item modal that asks users whether they want to delete all or not
  const [deleteAllWarning, setDeleteAllWarning] = useState(false);
  // state used to track whether user is editing an individual item or not; maybe use number index instead of boolean
  const [editing, setEditing] = useState(false);

  //function for the "add new item" button, sets newItem state to true which will trigger a modal to open to allow user to create a new List
  function addNewItem() {
    setNewItemModal(true);
  }

  //function to add new item that will be passed to child component as props
  function setNewItemState (listName:string){
    setNewItemModal(false);
    //change to spread operator bc .push() returns number and is buggy with types
    setList([
      ...list,
      {listName, complete:false, editing:false},
    ]);
  }

  //function for the "delete all items" button, sets the deleteAllWarning state to true to trigger a modal warning/asking for confirmation for the delete
  function confirmDeleteAllItems() {
    setDeleteAllWarning(true);
  }

  //function to actually delete all items in the list, will be passed to child modal component. also resets deleteAllWarning state to false to hide modal
  function deleteAllItems (confirmed:boolean) {
    setDeleteAllWarning(false); 
    if (confirmed){
      setList([]); 
    };
  }

  //function to edit an individual item on a list, will pass it down into the listItem component
  function editIndividualItem () {

  }

  //function to delete an individual item on a list, will pass it down into the listItem component
  function deleteIndividualItem () {

  }

  return (
    <>
      {/* Nav */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={kpmLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* List Component */}
      <h1>To Do List</h1>
      <button onClick={addNewItem}>+ Add New Item</button>
      <button onClick={confirmDeleteAllItems}>Clear All Items</button>
      <div className="card">
        <List
         listItems={list}
         />
      </div>

      {/* modals */}
      {deleteAllWarning && <ConfirmDeleteAllModal deleteAllItems={deleteAllItems}/>}
    </>
  )
}

export default App
