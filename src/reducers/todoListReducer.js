import { LIST_CONSTANTS, CARD_CONSTANTS } from "../utilities/constants";
import uuid from 'react-uuid';

export const todoListReducer = (state = [], action) => {
  switch (action.type) {
    
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
    
    // --- for new List
    case LIST_CONSTANTS.INSERT.LIST:
      return [...state,action.payload];

    case LIST_CONSTANTS.REMOVE.LIST:
      return action.payload;

      case CARD_CONSTANTS.REMOVE:
        return [...action.payload];

    default:
      return state;
  }
};


