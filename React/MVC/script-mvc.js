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
  todos: [{ id: -1, title: "first", completed: false, isEditing: false }],
  count: 0,
  filterBtn: "ALL",
};

// Controlers

function toggleActiveFilter(id) {
  state.filterBtn = id;
  renderView();
}

function createTodo(title) {
  // Manipulate Model
  const newTodo = {
    id: state.count + 1,
    title: title,
    completed: false,
    isEditing: false,
  };
  state.todos.push(newTodo);
  state.count++;

  //Trigger view render
  renderView();
}

function editTodo(id) {
  const todo = state.todos.find((todo) => todo.id === id);

  if (todo) {
    todo.isEditing = true;
  }
  renderView();
}

function confirmEditing(id, newValue) {
  console.log(id, newValue);
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.title = newValue;
    todo.isEditing = false;
  }
  renderView();
}

function cancelTodoEditing(id) {
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.isEditing = false;
  }
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
const filterBtnGroup = document.querySelector(".filter-btn-group");

function createTodoNode(todo) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.className = "checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  li.id = todo.id;

  if (!todo.isEditing) {
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    if (todo.completed) {
      span.className = "completed";
    }

    span.textContent = todo.title;
    deleteBtn.textContent = "Delete";
    li.append(checkbox, span, editBtn, deleteBtn);

    return li;
  } else {
    checkbox.disabled = true;
    const input = document.createElement("input");
    input.value = todo.title;
    input.className = "edit-input";
    const confirmBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    confirmBtn.className = "confirm-btn";
    cancelBtn.className = "cancel-btn";
    confirmBtn.textContent = "Confirm";
    cancelBtn.textContent = "Cancel";
    li.append(checkbox, input, confirmBtn, cancelBtn);
    return li;
  }
}

function renderView() {
  listContainer.innerHTML = "";
  state.todos
    .filter((todo) => {
      if (state.filterBtn === "ALL") {
        return true;
      }
      if (state.filterBtn === "ACTIVE") {
        return !todo.completed;
      }
      if (state.filterBtn === "COMPLETED") {
        return todo.completed;
      }
    })
    .forEach(function (todo) {
      const li = createTodoNode(todo);
      listContainer.append(li);
    });

  const btns = document.querySelectorAll(".filter-btn-group button");
  btns.forEach((btn) => {
    console.log(btn);
    if (btn.id === state.filterBtn) {
      btn.className = "active";
    } else {
      btn.className = "";
    }
  });

  document.querySelector("p").textContent = `${state.todos.filter(t => !t.completed).length} items left!`;
}



filterBtnGroup.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    toggleActiveFilter(e.target.id);
  }
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
  } else if (e.target.className === "edit-btn") {
    const li = e.target.parentElement;
    editTodo(Number(li.id));
  } else if (e.target.className === "cancel-btn") {
    const li = e.target.parentElement;
    cancelTodoEditing(Number(li.id));
  } else if (e.target.className === "confirm-btn") {
    const li = e.target.parentElement;
    const editInput = li.querySelector(".edit-input");

    confirmEditing(Number(li.id), editInput.value);
  }
});

renderView();
