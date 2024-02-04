export function insertTemplateToShop (id, name, category, price, url){
  const itemsWrapper = document.getElementsByClassName('shop__items')[0];
  const template = 
    `<div class="item">
      <div class="item__img">
        <img src=${url}>
      </div>
      <div class="item__options">
        <label id="id" class="hidden">${id}</label>
        <label class="item__name">${name}</label>
        <label>Category: ${category}</label>
        <label class="item__price">${price} $</label>
        <label class="add-button"><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart</label>
      </div>
    </div>`;
  
    itemsWrapper.insertAdjacentHTML("beforeend", template)
};

export function insertTemplateToCart(name, price, url, count){
  const cartWrapper = document.getElementsByClassName('cart-wrapper')[0];
  const template = 
    `<div class="cart-item">
    <div class="cart-item__block">
      <span id="btnDeleteItem" class="delete-item" title="Delete item"><i class="fa fa-trash"
          aria-hidden="true"></i></span>
    </div>
    <div class="cart-item__block">
      <img src=${url}>
    </div>
    <div class="cart-item__block">
      <span class="item-name">${name}</span>
      <p class="item-price">Price: ${price}</p>
    </div>
    <div class="cart-item__block">
      <span><i class="fa fa-minus math-buttons" aria-hidden="true"></i></span>
      <span class="counter__index">${count}</span>
      <span><i class="fa fa-plus math-buttons" aria-hidden="true"></i></span>
    </div>
  </div>`;
  
  cartWrapper.insertAdjacentHTML("beforeend", template)
};
