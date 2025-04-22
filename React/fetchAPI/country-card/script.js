//MVC

BASE_URL = "https://restcountries.com/v2";
SEARCH_BY_NAME_URL = `${BASE_URL}/name`;
FETCH_BY_CODE_URL = `${BASE_URL}/alpha?codes=`;

// Model
const state = {
  countries: [],
  neighbors: [],
};

//Controller

function fetchCountries(inputValue) {
  console.log("before");
  fetch(`${SEARCH_BY_NAME_URL}/${inputValue}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((data) => {
      state.countries = data;
      renderView();
    });
  console.log("after");
}

function fetchNeighborsByCode(code) {
  const country = state.countries.find(
    (country) => country.alpha3Code === code
  );
  if (country && country.borders) {
    const codesStr = country.borders.join(",");
    const url = `${FETCH_BY_CODE_URL}${codesStr}`;
    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((data) => {
        state.neighbors = data;
        renderView();
      });
  } else {
    state.neighbors = [];
    renderView();
  }
}

//View

function createNode(country) {
  const container = document.createElement("div");
  container.className = "country";
  container.id = country.alpha3Code;
  container.innerHTML = `
    <img class="country__img" src="${country.flags.png}" />
    <div class="country__data">
        <h3 class="country__name">${country.name}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${country.population}</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
    </div>
    `;
  return container;
}

const input = document.querySelector("input");
const searchButton = document.querySelector(".btn.search");
const countriesContainer = document.querySelector(".countries");
const neighborsContainer = document.querySelector(".neighbors");
const neighborsTitle = document.querySelector(".neighbors-title");

function renderView() {
  countriesContainer.innerHTML = "";
  state.countries.forEach((country) => {
    const node = createNode(country);
    countriesContainer.append(node);
  });

  if (state.neighbors.length > 0) {
    if (!neighborsTitle.classList.contains("show")) {
      neighborsTitle.classList.add("show");
    }
    state.neighbors.forEach((country) => {
      const node = createNode(country);
      neighborsContainer.append(node);
    });
  } else {
    neighborsContainer.innerHTML = "";
    neighborsTitle.classList.remove("show");
  }
}

searchButton.addEventListener("click", () => {
  const value = input.value;
  fetchCountries(value);
});

countriesContainer.addEventListener("click", (e) => {
  const cardContainer = e.target.closest("div.country");
  if (cardContainer) {
    const countryCode = cardContainer.id;
    fetchNeighborsByCode(countryCode);
  }
});
