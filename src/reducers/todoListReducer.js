import emptyInitialState from "../store/initialState";
import { LIST_CONSTANTS } from "../utilities/constants";

export const todoListReducer = (state = emptyInitialState.todoList, action) => {
  switch (action.type) {
    case LIST_CONSTANTS.ADD.LIST:
      return action.payload;
    default:
      return state;
  }
};
