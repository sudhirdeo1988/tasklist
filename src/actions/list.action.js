import {
  LIST_CONSTANTS,
  CARD_CONSTANTS,
  DRAG_CONSTANTS,
} from "../utilities/constants";

// ------------ Add List ---------------
export function addNewList(listName) {
  return { type: LIST_CONSTANTS.ADD, payload: { listName } };
}

// ------------ Remove List ---------------
export function removeList(listId) {
  return { type: LIST_CONSTANTS.REMOVE, payload: { listId } };
}

// ------------ Add Card ---------------
export function addNewCard(cardData, listId) {
  return { type: CARD_CONSTANTS.ADD, payload: { cardData, listId } };
}

// ------------ Remove Card ---------------
export function removeCard(listId, cardId) {
  return { type: CARD_CONSTANTS.REMOVE, payload: { listId, cardId } };
}

// ------------ Drag Drop Card ---------------
export function dragDropCard(dragDropData) {
  return { type: DRAG_CONSTANTS.ADD, payload: { ...dragDropData } };
}
