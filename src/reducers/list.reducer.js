import { LIST_CONSTANTS, CARD_CONSTANTS, DRAG_CONSTANTS } from "../utilities/constants";
import uuid from "react-uuid";

export const todoListReducer = (state = [], action) => {
  switch (action.type) {
    // --- Add New List
    case LIST_CONSTANTS.ADD: {
      const backup = [...state];
      const newList = {
        id: uuid(),
        name: action.payload.listName,
        cards: [],
      };
      backup.push(newList);
      return backup;
    }

    // --- for remove List
    case LIST_CONSTANTS.REMOVE: {
      const backup = [...state];
      const updatedLists = backup.filter(
        (item) => item.id !== action.payload.listId
      );
      return updatedLists;
    }

    // --- for new Card
    case CARD_CONSTANTS.ADD: {
      const backup = [...state];
      const listData = backup.find((list) => action.payload.listId === list.id);
      console.log(listData);
      listData.cards.push({
        id: uuid(),
        name: action.payload.cardName,
      });
      return backup;
    }

    // --- for remove Card
    case CARD_CONSTANTS.REMOVE: {
      const backup = [...state];
      const updatedListForCards = backup.find(
        (listItem) => listItem.id === action.payload.listId
      );
      updatedListForCards.cards = updatedListForCards.cards.filter(
        (cardItem) => cardItem.id !== action.payload.cardId
      );
      return backup;
    }

    
    // --- for remove Card
    case DRAG_CONSTANTS.REMOVE: {
      const backup = [...state];
      const updatedListForCards = backup.find(
        (listItem) => listItem.id === action.payload.listId
      );
      updatedListForCards.cards = updatedListForCards.cards.filter(
        (cardItem) => cardItem.id !== action.payload.cardId
      );
      return backup;
    }

    default:
      return state;
  }
};
