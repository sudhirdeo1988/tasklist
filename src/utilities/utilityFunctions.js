import emptyInitialState from '../store/initialState';

export function setWebStorage(data) {
  const newData = !data ? emptyInitialState.todoList : data;
  if (typeof Storage !== 'undefined') {
    if (localStorage) {
      localStorage.setItem('todoList', JSON.stringify(newData));
    } else {
      sessionStorage.setItem('todoList', JSON.stringify(newData));
    }
  }
}

export function getWebStorage() {
  let data = [];
  if (typeof Storage !== 'undefined') {
    if (localStorage) {
      data = localStorage.getItem('todoList');
      if(!data){
        localStorage.setItem('todoList',JSON.stringify(emptyInitialState.todoList));
        data = localStorage.getItem('todoList');
      }
    } else {
      data = sessionStorage.getItem('todoList');
      if(!data){
        sessionStorage.setItem('todoList',JSON.stringify(emptyInitialState.todoList));
        data = sessionStorage.getItem('todoList');
      }
    }
  }
  return JSON.parse(data);
}

// export function createNewList (listName) {
//   const newData = getWebStorage();
//   const newList = 
//     {
//       listId: uuid(),
//       listTitle: listName,
//       listCards:[]
//     };
//     newData.push(newList);
//     setWebStorage(newData);  
// }

// export function createNewCard (listId, listName) {
//   const newData = getWebStorage();
//   const list = newData.find(item => item.listId === listId);
//   console.log(list);
//   if(list){
//     list.listCards.push({
//       cardId: uuid(),
//       cardName: listName
//     });
//   }
//   setWebStorage(newData);  
// }