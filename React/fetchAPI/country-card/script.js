//MVC

// Model
const state = {
  countries: [],
};

//Controller

function fetchCountries(inputValue) {
  fetch(
    `https://api.countrylayer.com/v2/name/${inputValue}?access_key=9eaf1bc09dc464b34c276d10ab2a7a95`
  )
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((data) => {
      state.countries = data;
      renderView();
    });
}

//View

function createNode(country) {
  const container = document.createElement("div");
  container.className = "country";
  container.id = country.alpha2Code;
  container.innerHTML = `
    <img class="country__img" src="" />
    <div class="country__data">
        <h3 class="country__name">${country.name}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${country.capital}</p>
    </div>
    `;
  return container;
}

const input = document.querySelector("input");
const searchButton = document.querySelector(".btn.search");

function renderView() {
  const countriesContainer = document.querySelector(".countries");
  countriesContainer.innerHTML = "";
  state.countries.forEach((country) => {
    const node = createNode(country);
    countriesContainer.append(node);
  });
}

searchButton.addEventListener("click", () => {
  const value = input.value;
  fetchCountries(value);
});
