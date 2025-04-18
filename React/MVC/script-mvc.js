// TODO-MVC

// Model
/*
[ {
    id : number, 
    title: string, 
    completed: boolean
}]
*/

/*
follow: https://todomvc.com/examples/react/dist/#/
1. filter: all, active, completed
2. click edit, show input and 'confirm', 'cancel' button
3. when you click confirm, update the todo value
4. when you click cancel, reset to the default state
5. disable the checkbox in editing mode
*/

const state = {
  todos: [{ id: -1, title: "first", completed: false }],
  count: 0,
};

// Controlers

function createTodo(title) {
  // Manipulate Model
  const newTodo = {
    id: state.count + 1,
    title: title,
    completed: false,
  };
  state.todos.push(newTodo);
  state.count++;

  //Trigger view render
  renderView();
}

function deleteTodo(id) {
  const newTodos = state.todos.filter((todo) => {
    return todo.id !== id;
  });

  state.todos = newTodos;
  renderView();
}

function toggleTodo(id) {
  const todo = state.todos.find(function (todo) {
    return todo.id === id;
  });
  todo.completed = !todo.completed;

  renderView();
}

// View
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const listContainer = document.querySelector("#list-container");

function createTodoNode(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const checkbox = document.createElement("input");
  deleteBtn.className = "delete-btn";
  editBtn.textContent = "Edit";
  checkbox.className = "checkbox";

  checkbox.checked = todo.completed;

  if (todo.completed) {
    span.className = "completed";
  }

  li.id = todo.id;
  checkbox.type = "checkbox";
  span.textContent = todo.title;
  deleteBtn.textContent = "Delete";
  li.append(checkbox, span, editBtn, deleteBtn);

  return li;
}

function renderView() {
  listContainer.innerHTML = "";
  state.todos.forEach(function (todo) {
    const li = createTodoNode(todo);
    listContainer.append(li);
  });
}

addBtn.addEventListener("click", () => {
  createTodo(todoInput.value);
  todoInput.value = "";
});

listContainer.addEventListener("click", (e) => {
  console.log(e.target.className);
  if (e.target.className === "delete-btn") {
    // click the deleted btn
    const li = e.target.parentElement;
    deleteTodo(Number(li.id));
  } else if (e.target.className === "checkbox") {
    //click the checkbox
    const li = e.target.parentElement;
    toggleTodo(Number(li.id));
  }
});

renderView();
