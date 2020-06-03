const emptyInitialState = {
  todoList: [
    {
      listId: 1,
      listTitle: 'ToDo',
      listCards:[
        {
          cardId: 1,
          cardName: 'My First Card'
        },
        {
          cardId: 2,
          cardName: 'My Second Card'
        }
      ]
    },
    {
      listId: 2,
      listTitle: 'In Progress',
      listCards:[
        {
          cardId: 1,
          cardName: 'My First Card'
        },
        {
          cardId: 2,
          cardName: 'My Second Card'
        }
      ]
    }
  ]
};

export default emptyInitialState;
