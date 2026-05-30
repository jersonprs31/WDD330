import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    
    // Add event listeners to all "X" buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', removeItem);
    });

    // Calculate total using your reduce method
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Show total
    document.querySelector('.cart-total').innerText = `Total: $${total.toFixed(2)}`;
    document.querySelector('.cart-footer').classList.remove('hide');
    
  } else {
    // If the cart is empty, show a message and hide the footer
    document.querySelector('.product-list').innerHTML = '<p>Your cart is currently empty.</p>';
    document.querySelector('.cart-footer').classList.add('hide');
  }
}

function removeItem(event) {
  const itemId = event.target.getAttribute('data-id');
  let cartItems = getLocalStorage('so-cart');
  
  const itemIndex = cartItems.findIndex(item => item.Id === itemId);
  
  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
  }
  
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-item" data-id="${item.Id}">❌</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
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