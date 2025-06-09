import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import kpmLogo from './assets/kpmpowerLogo.png'
import './App.css'
import List from './components/List/List'
import ConfirmDeleteAllModal from './components/ConfirmDeleteAllModal/ConfirmDeleteAllModal'
import AddNewItemModal from './components/AddNewItemModal/AddNewItemModal'

// Core features: add item, edit item, remove item, done (checkmark)
// structure: typescript/react, modular and maintainable/scalable
// unit tests using vitest or jest? add, edit, remove item, validating rendered output of list
// UI requirements: simple user-friendly interface, visual feedback when appropriate (when editing), add styling
// bonus- store state in local storage or backend database

//type for a List Item (the list is rendered from an array of ListItems)
interface ListItem {
  listName:string;
  complete:boolean;
  editing:boolean;
  id:number;
}

const localStorageKey = 'KPM-TASKS';

function App() {
  // state used to track the list, starts off checking the local storage for old lists, otherwise adds a default list item
  const [list, setList] = useState(loadListFromStorage);
  //state used to track whether user is making a new item or not, will open the new item modal that allows user to input the list item name
  const [newItemModal, setNewItemModal] = useState(false);
  //state used to track whether user is deleting all items on list or not, will open a new item modal that asks users whether they want to delete all or not
  const [deleteAllWarning, setDeleteAllWarning] = useState(false);

  //useEffect hook that will update local storage every single time the list state is updated
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  }, [list]);

  //function to load list from storage safely (without causing type errors) by validating local storage before putting it into state
  function loadListFromStorage(): ListItem[] {
    const storedLists = localStorage.getItem(localStorageKey);
    if (!storedLists) return [];

    try {
      const parsedStoredLists = JSON.parse(storedLists);
      if (Array.isArray(parsedStoredLists) && parsedStoredLists.every(item =>
        typeof item.listName === 'string' &&
        typeof item.complete === 'boolean' &&
        typeof item.editing === 'boolean' &&
        typeof item.id === 'number' 
      )) {
        return parsedStoredLists
      }
  } catch (error) {
    console.warn('Failed to grab list from local storage', error);
  }
  return [];
}

  //function for the "add new item" button, sets newItem state to true which will trigger a modal to open to allow user to create a new List
  function addNewItem() {
    setNewItemModal(true);
  }

  //function to add new item that will be passed to child component as props
  function setNewItemState (listName:string){
    setNewItemModal(false);
    if (listName !== ''){
      //change to spread operator bc .push() returns number and is buggy with types
      setList([
        ...list,
        {listName, complete:false, editing:false, id:(list.length)},
      ]);
    }
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

  //function to set editing an individual item to true by changing state and the list array, so the child listItem component can turn into the "editable" mode
  //toDO: add some kind of protection to prevent multiple edits; maybe turn indexToEdit to an array of numbers?
  function setEditIndividualItem (IdToEdit:number) {
    setList(currentList =>
      currentList.map((item, currentIndex) =>
        currentIndex === IdToEdit ? {...item, editing:true} : item
      )
    );
  }

  //function to edit an individual item on a list from the list array, will pass it down into the listItem component
  function editIndividualItem (idToEdit:number, newListName:string) {
    setList(currentList =>
      currentList.map((item, currentIndex) =>
        currentIndex === idToEdit ? {...item, listName: newListName, editing:false} : item
      )
    );
  }

  //function to delete an individual item on a list, will pass it down into the listItem component
  function deleteIndividualItem (idToDelete:number) {
    setList(currentList =>
      currentList.filter(item => item.id !== idToDelete)
    );
  }

  // function to check or uncheck the listItem's checkBox by toggling the .complete state with ! reversing the boolean; will pass down to listItem component
  function toggleCheckBox (idToToggle:number) {
    setList(currentList => 
      currentList.map((item) => item.id === idToToggle ? {...item, complete: !item.complete}: item)
    );
  }

  return (
    <>
      {/* Sidebar Navigation */}
      <div className="sidebar-nav">
        <div className="logo-section">
          <a href="https://www.kpmpower.com/" target="_blank">
            <img src={kpmLogo} className="logo" alt="KPM logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        
        <div className="nav-actions">
          <h3>Actions</h3>
          <button onClick={addNewItem}>+ Add New Item</button>
          <button onClick={confirmDeleteAllItems}>Clear All Items</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>KPM TASKS</h1>
        <div className="card">
          <List
            listItems={list}
            setEditIndividualItem={setEditIndividualItem}
            editIndividualItem={editIndividualItem}
            deleteIndividualItem={deleteIndividualItem}
            toggleCheckBox={toggleCheckBox}
          />
        </div>
      </div>

      {/* Modals */}
      {deleteAllWarning && <ConfirmDeleteAllModal deleteAllItems={deleteAllItems}/>}
      {newItemModal && <AddNewItemModal setNewItemState={setNewItemState}/>}
    </>
  )
}

export default App
