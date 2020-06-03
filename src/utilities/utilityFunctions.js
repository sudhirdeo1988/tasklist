import emptyInitialState from '../store/initialState';

export function setWebStorage() {
  if (typeof Storage !== 'undefined') {
    if (localStorage) {
      localStorage.setItem('todoList', JSON.stringify(emptyInitialState.todoList));
    } else {
      sessionStorage.setItem('todoList', JSON.stringify(emptyInitialState.todoList));
    }
  }
}

export function getWebStorage() {
  let data = [];
  if (typeof Storage !== 'undefined') {
    if (localStorage) {
      data = localStorage.getItem('todoList', JSON.stringify(emptyInitialState.todoList));
    } else {
      data = sessionStorage.getItem('todoList', JSON.stringify(emptyInitialState.todoList));
    }
  }
  return JSON.parse(data);
}