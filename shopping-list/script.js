/*
 * https://frontendeval.com/questions/shopping-list
 *
 * Create a shopping list app with autocomplete item entry
 */

const API_URL = "https://api.frontendeval.com/fake/food/";

const ulEl = document.querySelector("#search-items-result");
const searchInputEl = document.querySelector("#search-items-input");

const onSearch = debounce(async (evt) => {
  // Empty list
  ulEl.innerHTML = "";

  const searchValue = evt.target.value || "";
  if (searchValue.length < 2) {
    ulEl.style.display = "none";
    return;
  }

  const items = await fetchItems(searchValue);
  items.forEach((item) => {
    const liEl = document.createElement("li");
    liEl.className = "search-item";
    liEl.textContent = item;

    ulEl.appendChild(liEl);
  });

  // Display list if only results
  ulEl.style.display = items.length ? "block" : "none";
});

function addItem(evt) {
  const item = evt.target.textContent;
  const itemEl = document.createElement("li");
  itemEl.className = "selected-item";

  // Children
  const toggleButtonEl = document.createElement("button");
  toggleButtonEl.className = "selected-item-toggle";
  toggleButtonEl.textContent = "✔";
  toggleButtonEl.addEventListener("click", toggleSelectedItem);
  itemEl.appendChild(toggleButtonEl);

  const labelEl = document.createElement("div");
  labelEl.className = "selected-item-label";
  labelEl.textContent = item;
  itemEl.appendChild(labelEl);

  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.className = "selected-item-delete";
  deleteButtonEl.innerHTML = "&times";
  deleteButtonEl.addEventListener("click", deleteSelectedItem);
  itemEl.appendChild(deleteButtonEl);

  const itemsListEl = document.querySelector("#selected-items");
  itemsListEl.appendChild(itemEl);

  // close the list
  ulEl.style.display = "none";
  searchInputEl.value = "";
}

function toggleSelectedItem(evt) {
  const parentEl = evt.target.parentElement;
  parentEl.classList.toggle("checked");
}

function deleteSelectedItem(evt) {
  const parentEl = evt.target.parentElement;
  parentEl.remove();
}

searchInputEl.addEventListener("input", onSearch);
ulEl.addEventListener("click", addItem);

async function fetchItems(val) {
  const resp = await fetch(API_URL + val);
  const res = await resp.json();
  return res;
}

function debounce(fn, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}
