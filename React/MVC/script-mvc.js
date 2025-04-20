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

let currentFilter = "all"; // all, active, completed
let editingId = null; // -1 means not editing

function setFilter(filter) {
  currentFilter = filter;
  renderView();
}

function updateTodoTitle(id, newTitle) {
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.title = newTitle;
  }
  editingId = null; // reset editingId
  renderView();
}

function cancelEdit() {
  editingId = null; // reset editingId
  renderView();
}

const state = {
  todos: [{ id: -1, title: "first", completed: false }],
  count: 0
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
  li.id = todo.id;

  if (editingId === todo.id) {
    const input = document.createElement("input");
    input.value = todo.title;
    input.className = "edit-input";

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Confirm";
    confirmBtn.onclick = () => updateTodoTitle(todo.id, input.value);

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = cancelEdit;

    li.append(input, confirmBtn, cancelBtn);
  } else {
    const span = document.createElement("span");
    span.textContent = todo.title;
    if (todo.completed) span.className = "completed";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = todo.completed;
    if (editingId !== null) checkbox.disabled = true;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      editingId = todo.id;
      renderView();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.append(checkbox, span, editBtn, deleteBtn);
  }
  return li;
}

function renderView() {
  listContainer.innerHTML = "";
  const filtered = state.todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach((todo) => {
    const li = createTodoNode(todo);
    listContainer.appendChild(li);
  });

  document.querySelector("p").textContent = `${state.todos.filter(t => !t.completed).length} items left!`;
}

// Filter button handlers
document.querySelectorAll("div button").forEach((btn) => {
  if (btn.textContent === "All") btn.onclick = () => setFilter("all");
  if (btn.textContent === "Active") btn.onclick = () => setFilter("active");
  if (btn.textContent === "Completed") btn.onclick = () => setFilter("completed");
  if (btn.textContent === "Clear Completed") btn.onclick = () => {
    state.todos = state.todos.filter((t) => !t.completed);
    renderView();
  };
});


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
