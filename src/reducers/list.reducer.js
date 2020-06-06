import { LIST1_CONSTANTS, CARD_CONSTANTS } from "../utilities/constants";
import uuid from 'react-uuid';

export const todoListReducer = (state = [], action) => {
  switch (action.type) {

    // --- for new List
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
    // dispatch({type: LIST1_CONSTANTS.ADD, payload:newList});
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
    


    case LIST1_CONSTANTS.REMOVE.LIST:
      return action.payload;

      case CARD_CONSTANTS.REMOVE:
        return [...action.payload];

    default:
      return state;
  }
};


