import { collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from './firebaseConfig.js';

async function getProducts() {
    try {
        const products = await getDocs(collection(db, 'products'));

        const formatedProducts = [];

        products.forEach((product) => {
            const formatedProduct = {
                id: product.id,
                info: product.data()
            }

            formatedProducts.push(formatedProduct);
        });

        return formatedProducts;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function getCart() {
    try {
        const products = await getDocs(collection(db, 'cart'));

        const formatedProducts = [];

        products.forEach((product) => {
            const formatedProduct = {
                id: product.id,
                info: product.data()
            }

            formatedProducts.push(formatedProduct);
        });

        console.log(formatedProducts);

        return formatedProducts;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function addToCart(product) {
    try {
        await addDoc(collection(db, 'cart'), {
            title: product.info.title,
            price: product.info.price
        })
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function removeFromCart(id) {
    try {
        await deleteDoc(doc(db, 'cart', id));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function postOrder(order) {
    try {
        await addDoc(collection(db, 'orders'), order)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

export { getProducts, getCart, addToCart, removeFromCart, postOrder }