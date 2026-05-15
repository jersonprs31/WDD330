import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Create an instance of our ProductData class.
const dataSource = new ProductData('tents');

// Get the element we want the product list to render in
const listElement = document.querySelector('.product-list');

// Create an instance of our ProductList class and call the init method to do its magic
const productList = new ProductList('tents', dataSource, listElement);
productList.init();