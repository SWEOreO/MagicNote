// DOM - document object model

// Element CURD operation - Create, Read, Update, Delete

// Read Element

// Read element by id

const h1 = document.getElementById("title");
console.log(h1);
const titleText = h1.textContent;
console.log(titleText);
console.log(h1.parentElement);
const app = document.getElementById("app");
console.log(app.children[0].textContent);

//Read elements by className

const items = document.getElementsByClassName("list-item");
console.log("items", items);
console.log(items[0]);

const listContainer = document.getElementById("list-container");
const listItems = listContainer.getElementsByClassName("list-item");
console.log("listItems", listItems);

// Read elements by tag name

const listItemsByTags = document.getElementsByTagName("li");
console.log("listItemsByTags", listItemsByTags);

// read by query selector
console.log(document.querySelector("#title"));
console.log(document.querySelector(".list-item"));

// read by query selector all
console.log(document.querySelectorAll("#list-container .list-item"));

// Update

h1.textContent = "<div>Hello world 2026</div>";
h1.innerHTML = "<div>Hello world 2026</div>";

h1.style.color = "red";
h1.style.backgroundColor = "blue";

console.log(h1.style.color);

h1.className = h1.className + " title-class-name";
console.log(h1.className);

console.log(h1.classList.contains("title-class-name"));
h1.classList.add("new-class");

console.log(h1.id);

h1.setAttribute("name", "title");
console.log(h1.getAttribute("name"));

// Create
const li = document.createElement("li");
const li2 = document.createElement("li");
li.textContent = "4";
li2.textContent = "5";
li.className = "list-item";
li2.className = "list-item";

listContainer.append(li, li2);

// Delete

li.remove();
listContainer.innerHTML = "";

h1.addEventListener("click", function (event) {
  console.log("the element is clicked", event);
  const text = event.target.textContent;
  console.log(text);
  console.log(text.split("").reverse().join(""));
  event.target.textContent = text.split("").reverse().join("");
});

const textInput = document.querySelector("#text-input");
const displayBtn = document.querySelector("#display-btn");
console.log(displayBtn);

displayBtn.addEventListener("click", function () {
  console.log(textInput.value);
  const div = document.querySelector("#content-container");
  div.innerHTML = textInput.value;
  textInput.value = "";
});
