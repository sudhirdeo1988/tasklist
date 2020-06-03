import { createStore, combineReducers } from "redux";
import { todoListReducer } from "../reducers/todoListReducer";

const rootReducer = combineReducers({
  todoList: todoListReducer
});

export default () => {
  let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return { store }
}
