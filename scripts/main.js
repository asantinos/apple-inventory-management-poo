/**
 * Author : Alejandro Santos Garcia
 * Github repository : https://github.com/asantinos/apple-inventory-management
 */

import { listProducts } from "./listProducts.js";
import { addEditProduct } from "./addEditProduct.js";
import { showTotalInventory } from "./showTotalInventory.js";
import { searchProduct } from "./searchProduct.js";
import { Product } from "./product.js";
import { ProductManager } from "./products.js";
import { LocalStorageManager } from "./localStorageManager.js";

document.addEventListener("DOMContentLoaded", listProducts);
document.addEventListener("DOMContentLoaded", addEditProduct);
document.addEventListener("DOMContentLoaded", showTotalInventory);
document.addEventListener("DOMContentLoaded", searchProduct);

export const productManager = new ProductManager();

const localStorageManager = new LocalStorageManager();

if (!localStorageManager.get("isInitialized")) {
    // Crear productos
    const getRandomQuantity = () => {
        return Math.floor(Math.random() * 100) + 1;
    };

    const inventory = [
        new Product(1, "iPhone 13", getRandomQuantity(), 799.99),
        new Product(2, "iPad Pro", getRandomQuantity(), 999.99),
        new Product(3, "MacBook Air", getRandomQuantity(), 1299.99),
        new Product(4, "Apple Watch Series 7", getRandomQuantity(), 399.99),
        new Product(5, "AirPods Pro", getRandomQuantity(), 199.99),
        new Product(6, "iMac", getRandomQuantity(), 1499.99),
        new Product(7, "Mac Mini", getRandomQuantity(), 699.99),
        new Product(8, "HomePod", getRandomQuantity(), 299.99),
        new Product(9, "Apple TV 4K", getRandomQuantity(), 179.99),
        new Product(10, "Magic Keyboard", getRandomQuantity(), 149.99),
        new Product(11, "Apple Pencil", getRandomQuantity(), 99.99),
        new Product(12, "iPhone 12", getRandomQuantity(), 699.99),
        new Product(13, "iPad Air", getRandomQuantity(), 499.99),
        new Product(14, "MacBook Pro", getRandomQuantity(), 1799.99),
        new Product(15, "Apple Watch SE", getRandomQuantity(), 279.99),
        new Product(16, "AirPods Max", getRandomQuantity(), 549.99),
        new Product(17, "Mac Pro", getRandomQuantity(), 5999.99),
        new Product(18, "HomePod Mini", getRandomQuantity(), 99.99),
        new Product(19, "Apple TV HD", getRandomQuantity(), 149.99),
        new Product(20, "Magic Mouse", getRandomQuantity(), 79.99),
    ];

    // Agregar objetos productos al producto manager
    inventory.forEach((product) => {
        productManager.addProduct(product);
    });

    localStorageManager.set("isInitialized", true);
}

// console.log(productManager.listProducts());
