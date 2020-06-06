import {setWebStorage} from '../utilities/utilityFunctions';
import { LIST_CONSTANTS, CARD_CONSTANTS } from "../utilities/constants";
import uuid from 'react-uuid';

export function setData(listName) {
    return (dispatch, getState)=>{
        const newList = 
            {
              listId: uuid(),
              listTitle: listName,
              listCards:[]
            };
        dispatch({type: LIST_CONSTANTS.INSERT.LIST, payload:newList});
    }
}


export function addCard(cardName,listId){ 
  return {type: CARD_CONSTANTS.ADD, payload:{cardName,listId}}
}

// ------------ Remove List ---------------
export function removeList(listId){ 
  return (dispatch, getState)=>{
    const newData = getState().todoList;
    const list = newData.filter(item => item.listId !== listId);
    setWebStorage(list);  
    dispatch({type: LIST_CONSTANTS.REMOVE.LIST, payload:list});
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
