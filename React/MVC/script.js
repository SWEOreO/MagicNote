const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const listContainer = document.querySelector("#list-container");

addBtn.addEventListener("click", () => {
  if (!todoInput.value) {
    return;
  }
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  span.textContent = todoInput.value;
  deleteBtn.textContent = "Delete";
  li.append(checkbox, span, deleteBtn);

  //   deleteBtn.addEventListener("click", function () {
  //     li.remove();
  //   });

  listContainer.append(li);
  todoInput.value = "";
});

listContainer.addEventListener("click", function (e) {
  console.log("listContainer is clicked", e.target.parentElement);
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
});

// ['asd', 'sdf', 'qwe']
// --->
// ['sdf', 'qwe']
