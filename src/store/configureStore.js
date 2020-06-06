import { createStore, combineReducers, applyMiddleware, compose  } from "redux";
import thunk from 'redux-thunk';
import { todoListReducer } from "../reducers/todoListReducer";

const rootReducer = combineReducers({
  todoList: todoListReducer
});
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export default () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return { store }
}
