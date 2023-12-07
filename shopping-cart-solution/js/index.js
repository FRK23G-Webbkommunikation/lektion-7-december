import { getProducts, getCart, addToCart, removeFromCart, postOrder } from "./modules/firestore.js";

const productsElem = document.querySelector('#products');
const cartProductsElem = document.querySelector('#cart-products');
const cartButton = document.querySelector('#open-cart');
const orderButton = document.querySelector('#orderButton');

async function createCartElement(product) {
    const containerElem = document.createElement('article');
    const headingElem = document.createElement('h3');
    const priceElem = document.createElement('p');
    const removeProductButton = document.createElement('button');

    headingElem.innerText = product.info.title;
    priceElem.innerText = `Pris: ${product.info.price} kr`;
    removeProductButton.innerText = 'Ta bort';

    containerElem.append(headingElem);
    containerElem.append(priceElem);
    containerElem.append(removeProductButton);
    cartProductsElem.append(containerElem);

    removeProductButton.addEventListener('click', () => {
        removeFromCart(product.id);
        updateAndDisplayCart();
    });
}

async function displayCartProducts(cartProducts) {
    cartProductsElem.innerHTML = '' // Tar bort alla element i vår HTML för att ersätta med nytt från databasen

    for(const cartProduct of cartProducts) {
        createCartElement(cartProduct);
    }
}

async function updateAndDisplayCart() {
    const cart = await getCart();

    document.querySelector('#productsInCart').innerHTML = cart.length;

    displayCartProducts(cart);
}

async function createProductElement(product) {
    const containerElem = document.createElement('article');
    const headingElem = document.createElement('h3');
    const descriptionElem = document.createElement('p');
    const priceElem = document.createElement('p');
    const cartButton = document.createElement('button');

    containerElem.classList.add('card');
    headingElem.innerText = product.info.title;
    descriptionElem.innerText = product.info.description;
    priceElem.innerText = `Pris: ${product.info.price} kr`;
    cartButton.innerText = 'Lägg till i varukorg';
    cartButton.classList.add('button');

    containerElem.append(headingElem);
    containerElem.append(descriptionElem);
    containerElem.append(priceElem);
    containerElem.append(cartButton);
    productsElem.append(containerElem);

    cartButton.addEventListener('click', () => {
        addToCart(product);
        updateAndDisplayCart();
    });
}

async function displayProducts(products) {
    for(const product of products) {
        createProductElement(product);
    }
}

async function init() {
    const products = await getProducts();
    
    displayProducts(products);
    updateAndDisplayCart();
}

async function prepareOrder() {
    const cart = await getCart();

    // Räkna ut totalsumma
    let totalPrice = 0;
    for (const product of cart) {
        totalPrice = totalPrice + product.info.price;
    }

    const order = {
        products: cart,
        totalPrice: totalPrice
    } 

    await postOrder(order);
}

cartButton.addEventListener('click', async () => {
    document.querySelector('#cart').classList.toggle('hide');
});

orderButton.addEventListener('click', async () => {
    await prepareOrder();
});

init();