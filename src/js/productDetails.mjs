import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Fetch the data
    this.product = await this.dataSource.findProductById(this.productId);
    
    // 2. Render the HTML
    this.renderProductDetails('main');
    
    // 3. Attach the event listener AFTER the button exists in the DOM
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    let cart = getLocalStorage('so-cart');
    if (!Array.isArray(cart)) {
      cart = [];
    }
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterBegin', this.productDetailsTemplate(this.product));
  }

  productDetailsTemplate(product) {
    return `<section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}">
      <p class="product-card__price">$${product.ListPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
  }
}