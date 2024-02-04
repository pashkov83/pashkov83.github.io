import { getItemsList } from "./http.service.js";
import { insertTemplateToShop, insertTemplateToCart } from "./template.js";

const itemsWrapper = document.getElementsByClassName("shop__items")[0];
const cartWrapper = document.getElementsByClassName('cart-wrapper')[0];
itemsWrapper.innerHTML = "";
const search = document.getElementById("search");
const filterSet = document.querySelectorAll(".topic");

const mainPage = document.getElementById("mainPage");
const historyPage = document.getElementById("historyPage");
const shopPage = document.getElementById("shopPage");
const pages = [
  { button: mainPage, elements: document.querySelectorAll(".mainpage") },
  { button: historyPage, elements: document.querySelectorAll(".historypage") },
  { button: shopPage, elements: document.querySelectorAll(".shoppage") }
];

let itemsList = [];
let filteredByPrice = [];
let filteredByCategory = [];

togglePage(mainPage);

pages.forEach(page => page.button.addEventListener("click", () => togglePage(page.button)));

getItemsList().then((data) => {
  itemsList = data;
  const maxPrice = Math.max(...itemsList.map((item) => item.price));
  const minPrice = Math.min(...itemsList.map((item) => item.price));
  console.log(minPrice, maxPrice);
  range.min = minPrice;
  range.max = maxPrice;
  range.value = maxPrice;
  rangeValue.textContent = maxPrice;
  renderItems(itemsList);
});

filterSet.forEach((el) =>
  el.addEventListener("click", () => {
    filterPrice();
    filterCategory(el);
  })
);

function filterCategory(el) {
  if (el.id === "all") {
    renderItems(itemsList);
  } else {
    filteredByCategory = itemsList.filter((item) => item.category === el.id);
    renderItems(filteredByCategory);
  }
}

function renderItems(items) {
  itemsWrapper.innerHTML = "";
  items.forEach((el) =>
    insertTemplateToShop(el.id, el.name, el.category, el.price, el.url)
  );
  addToCart();
}

function togglePage(button) {
  pages.forEach(page => {
    if (button === page.button) {
      page.elements.forEach(el => el.classList.remove("hidden"));
    } else {
      page.elements.forEach(el => el.classList.add("hidden"));
    }
  });
}



// ====== CART MODAL WINDOW ======
const cartBtn = document.getElementById("cart");
const modal = document.getElementById("modal");

cartBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

const closeBtn = modal.querySelector("#modalCloseBtn");
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
// ====== CART MODAL WINDOW ======

const range = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");
const maxPrice = Math.max(...itemsList.map((item) => item.price));
const minPrice = Math.min(...itemsList.map((item) => item.price));
range.min = minPrice;
range.max = maxPrice;
rangeValue.textContent = minPrice;

range.addEventListener("input", () => filterPrice());

function filterPrice() {
  const selectedPrice = parseInt(range.value);
  rangeValue.textContent = selectedPrice;
  filteredByPrice = itemsList.filter(
    (item) => item.price <= selectedPrice
  );
  renderItems(filteredByPrice);
}



function saveToLocalStorage() {
  localStorage.setItem("catalog", value);
}


function addToCart () {
  const addButton = document.querySelectorAll(".add-button");
  const cartItemList = [];
  addButton.forEach(el=>el.addEventListener('click', ()=>{
    let currentId = el.parentNode.querySelector('#id').textContent;
    cartWrapper.innerHTML = "";
    let element = itemsList[currentId-1];
    cartItemList.push(element);
    console.log(cartItemList);
    //localStorage.setItem('catalog', cartItemList)
    //cartItemList.forEach(el=>insertTemplateToCart(el.name, el.price, el.url, countOccurrences(cartItemList)))
}))
}

function countOccurrences(arr) {
  arr.forEach((item) => {
    if (occurrences[item]) {
      occurrences[item]++;
    } else {
      occurrences[item] = 1;
    }
  });

  return occurrences;
}
