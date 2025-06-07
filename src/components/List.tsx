import ListItem from './listItem'
import type {ListItemProps} from './listItem'

interface ListProps {
    listItems: Array<ListItemProps>
}

// This is a list component, that will take in props of the entire list from state/localstorage, and map out all the ListItem components
export default function List ({
    listItems
}:ListProps) {
    return(
        <div>
            {
                <ListItem
                    listName={listItems[0].listName}
                    complete={listItems[0].complete}
                    editing={false}
                />
            }
        </div>
    )
}