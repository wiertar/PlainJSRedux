var state = { count: 0, todos: [] }

function counterReducer(state, action) {
  if (typeof state === 'undefined') {
    return { count: 0 }
  }
  // if (typeof state.count === 'undefined') {
  //   state.count = 0;
  //   return state;
  // }

  var nextState = {
    count: state.count
  };
  switch(action.type) {
    case 'ADD':
      nextState.count = state.count + 1;
      return nextState;
    case 'MINUS':
      nextState.count = state.count - 1;
      return nextState;
    case 'RESET':
      nextState.count = 0
      return nextState;
    default:
      return state;
  }
}

function todoReducer(state, action) {
  if (typeof state === 'undefined') {
    return { todos: [] }
  }
  if (typeof state.todos === 'undefined') {
    state.todos = [];
  }

  var nextState = { todos: [...state.todos] };

  switch (action.type) {
    case 'NEW':
      nextState.todos.push(action.payload);
      return nextState;
    case 'DELETE':
      nextState.todos.pop();
      return nextState;
    case 'DELETE_ALL':
      return nextState.todos = [];
    default:
      return state;
  }
}



var store = Redux.createStore(Redux.combineReducers({ counterReducer: counterReducer, todoReducer: todoReducer }), state);
var counter = document.getElementById('counter');
var todoInput = document.getElementById('todo');
var todoList = document.getElementById('todo-list');

function render() {
  console.log(store.getState());
  renderCounter();
  renderList();
}

function renderList() {
  var todos = store.getState().todoReducer.todos;
  if (typeof todos === 'undefined') {
    todoList.innerHTML = "";
    return;
  }
  var html = "";
  todos.map(x => {
    html += "<li>" + x + "</li>";
  });
  todoList.innerHTML = html;
}

function renderCounter() {
  counter.innerText = store.getState().counterReducer.count;
}

store.subscribe(render);

document.getElementById('add')
  .addEventListener('click', function() {
    store.dispatch({ type: 'ADD' });
  });

document.getElementById('minus')
  .addEventListener('click', function() {
    store.dispatch({ type: 'MINUS' });
  });

document.getElementById('reset')
  .addEventListener('click', function() {
    store.dispatch({ type: 'RESET' });
  });

document.getElementById('new')
  .addEventListener('click', function() {
    store.dispatch({ type: 'NEW', payload: todoInput.value });
  });

document.getElementById('delete')
  .addEventListener('click', function() {
    store.dispatch({ type: 'DELETE'});
  });

document.getElementById('delete-all')
  .addEventListener('click', function() {
    store.dispatch({ type: 'DELETE_ALL'});
  });