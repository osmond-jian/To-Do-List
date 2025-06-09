import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import ListItem from './ListItem'
import type { ListItem as ListItemArray } from '../../App'
import './List.css';

interface ListProps {
    listItems: {
        listName:string;
        complete:boolean;
        editing:boolean;
        id:number;
    }[];
    setEditIndividualItem: (IndexToEdit:number) => void
    editIndividualItem: (IdToEdit:number, NewListName:string) => void
    deleteIndividualItem: (IdToDelete:number) => void
    toggleCheckBox:(IdToToggle:number) => void
    setListItems:(newList: ListItemArray[]) => void
}

// This is a list component, that will take in props of the entire list from state/localstorage, and map out all the ListItem components
export default function List ({
    listItems,
    setEditIndividualItem,
    editIndividualItem,
    deleteIndividualItem,
    toggleCheckBox,
    setListItems,
}:ListProps) {
    function handleDragEnd(result: DropResult) {
        const { source, destination } = result;
        if (!destination) return;

        const reordered = [...listItems];
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);

        setListItems(reordered);
    }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {listItems.map((item, index) => (
                <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                {(provided) => (
                    <div className="draggable-wrapper">
                    <div
                        className="draggable-list-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <ListItem
                        {...item}
                        setEditIndividualItem={setEditIndividualItem}
                        editIndividualItem={editIndividualItem}
                        deleteIndividualItem={deleteIndividualItem}
                        toggleCheckBox={toggleCheckBox}
                        />
                    </div>
                    </div>
                )}
                </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}