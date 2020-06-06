import { LIST1_CONSTANTS, CARD_CONSTANTS } from "../utilities/constants";
import uuid from 'react-uuid';

export const todoListReducer = (state = [], action) => {
    switch (action.type) {

    // --- Add New List
    case LIST1_CONSTANTS.ADD:
    {
        const backup = [...state];
        const newList = 
        {
            listId: uuid(),
            listTitle:  action.payload.listName,
            listCards:[]
        };
        backup.push(newList);
        return backup;
    }

    // --- for remove List
    case LIST1_CONSTANTS.REMOVE:
    {
        const backup = [...state];
        const updatedLists = backup.filter(item => item.listId !== action.payload.listId);
        return updatedLists;
    }

    
    // --- for new Card
    case CARD_CONSTANTS.ADD:
    {
    const backup = [...state];
    const listData = backup.find(list =>  action.payload.listId === list.listId);
    listData.listCards.push({
        cardId: uuid(),
        cardName: action.payload.cardName
    })
    return backup;
    }

          // --- for remove Card
    case CARD_CONSTANTS.REMOVE:
    {
        const backup = [...state];
        const updatedListForCards =  backup.find(listItem => listItem.listId === action.payload.listId);
        updatedListForCards.listCards = updatedListForCards.listCards.filter(cardItem => cardItem.cardId !== action.payload.cardId);
        return backup;
    }
    


    // case LIST1_CONSTANTS.REMOVE.LIST:
    //   return action.payload;

    //   case CARD_CONSTANTS.REMOVE:
    //     return [...action.payload];

    default:
      return state;
  }
};


