const arr = [{ id: -1, title: "first", completed: false, isEditing: false }];

const jsonStr = JSON.stringify(arr);

console.log(jsonStr, typeof jsonStr);

const data = JSON.parse(jsonStr);
console.log(data);

fetch(
  "https://api.countrylayer.com/v2/all?access_key=3bf7488d1113ff5a6733e5e769c399b4"
)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((data) => {
    console.log("data", data);
  })
  .catch((e) => {
    console.log("error!", e);
  });
// Promise - ES6
