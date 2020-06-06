import { LIST1_CONSTANTS, CARD_CONSTANTS } from "../utilities/constants";
// import uuid from 'react-uuid';

// ------------ Add List ---------------
export function addNewList(listName) {
    return (dispatch, getState)=>{
        // const newList = 
        //     {
        //       listId: uuid(),
        //       listTitle: listName,
        //       listCards:[]
        //     };
        // dispatch({type: LIST1_CONSTANTS.ADD, payload:newList});
        return {type: CARD_CONSTANTS.ADD, payload:{listName}}
    }
}

// ------------ Add Card ---------------
export function addNewCard(cardName,listId){ 
  return {type: CARD_CONSTANTS.ADD, payload:{cardName,listId}}
}

// ------------ Remove List ---------------
export function removeList(listId){ 
  return (dispatch, getState)=>{
    const newData = getState().todoList;
    const list = newData.filter(item => item.listId !== listId);
    dispatch({type: LIST1_CONSTANTS.REMOVE, payload:list});
  }
}


// ------------ Remove Card ---------------
export function removeCardFromList(listId, cardId){ 
  return (dispatch, getState)=>{
    const newData = getState().todoList;
    const resultList =  newData.find(listItem => listItem.listId === listId);
    resultList.listCards = resultList.listCards.filter(cardItem => cardItem.cardId !== cardId);
    dispatch({type: CARD_CONSTANTS.REMOVE, payload:newData});
  }
}
