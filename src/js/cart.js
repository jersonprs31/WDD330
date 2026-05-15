import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  
  // 1. Check if cartItems exists and has at least one item
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    
    // 2. Calculate the total using the reduce array method
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // 3. Insert the total into the HTML and remove the 'hide' class
    document.querySelector('.cart-total').innerText = `Total: $${total.toFixed(2)}`;
    document.querySelector('.cart-footer').classList.remove('hide');
    
  } else {
    // If the cart is empty, show a message and keep the footer hidden
    document.querySelector('.product-list').innerHTML = '<p>Your cart is currently empty.</p>';
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();