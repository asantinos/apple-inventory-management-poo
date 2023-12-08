import { LocalStorageManager } from "./localStorageManager.js";

// Convertir productos a objetos
const productToObject = (product) => {
    return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
    };
};

export class ProductManager {
    #products;

    localStorageManager = new LocalStorageManager();

    constructor() {
        if (this.localStorageManager.get("products")) {
            this.#products = JSON.parse(
                this.localStorageManager.get("products")
            );
        } else {
            this.#products = [];
        }
    }

    // Método para obtener la lista de productos
    listProducts() {
        return this.#products;
    }

    // Método para agregar el producto
    addProduct(product) {
        this.#products.push(product);

        let productObject = productToObject(product);

        let previusStorage = this.localStorageManager.get("products");
        // Agregar el producto al local storage
        if (previusStorage) {
            previusStorage = JSON.parse(previusStorage);
            previusStorage.push(productObject);
            this.localStorageManager.set(
                "products",
                JSON.stringify(previusStorage)
            );
        } else {
            this.localStorageManager.set(
                "products",
                JSON.stringify([productObject])
            );
        }
    }

    // Método para actualizar un producto por su ID
    updateProductById(id, updateProduct) {
        const index = this.#products.findIndex((product) => product.id === id);

        // Si no existe error (es coincidente el index)
        if (index !== -1) {
            this.#products[index] = updateProduct;

            // Actualizar el local storage
            let previusStorage = this.localStorageManager.get("products");
            if (previusStorage) {
                previusStorage = JSON.parse(previusStorage);
                previusStorage[index] = productToObject(updateProduct);
                this.localStorageManager.set(
                    "products",
                    JSON.stringify(previusStorage)
                );
            } else {
                this.localStorageManager.set(
                    "products",
                    JSON.stringify([productToObject(updateProduct)])
                );
            }
        }
    }

    // Método para eliminar un producto
    deleteProductById(id) {
        const index = this.#products.findIndex((product) => product.id === id);

        if (index !== -1) {
            this.#products.splice(index, 1);

            // Actualizar el local storage
            let previusStorage = this.localStorageManager.get("products");
            if (previusStorage) {
                previusStorage = JSON.parse(previusStorage);
                previusStorage.splice(index, 1);
                this.localStorageManager.set(
                    "products",
                    JSON.stringify(previusStorage)
                );
            } else {
                this.localStorageManager.set("products", JSON.stringify([]));
            }
        }
    }

    // Método para mostrar todos los productos dentro del Array
    showProducts() {
        for (const product of this.#products) {
            console.log(
                `ID: ${product.id}, Nombre: ${product.nombre}, Cantidad: ${product.cantidad}, Precio: ${product.precio}`
            );
        }
    }

    get products() {
        return this.#products;
    }

    set products(value) {
        this.#products = value;
    }
}
