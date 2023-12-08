// import { inventory } from "./products.js";
import { productManager } from "./main.js";
import { Product } from "./product.js";
import { listProducts } from "./listProducts.js";
import { showTotalInventory } from "./showTotalInventory.js";

export const addEditProduct = () => {
    const productName = document.getElementById("product-name-input");
    const productQuantity = document.getElementById("product-quantity-input");
    const productPrice = document.getElementById("product-price-input");
    const addEditButton = document.getElementById("add-edit-button");
    const actionsMessage = document.getElementById("actions-message");

    // ADD PRODUCT
    const addNewProduct = () => {
        if (
            productName.value !== "" &&
            productQuantity.value !== "" &&
            productPrice.value !== ""
        ) {
            productManager.addProduct(
                new Product(
                    productManager.listProducts().length + 1,
                    productName.value,
                    parseInt(productQuantity.value),
                    parseFloat(productPrice.value)
                )
            );

            listProducts();
            showTotalInventory();

            productName.value = "";
            productQuantity.value = "";
            productPrice.value = "";

            // If the message has the error class, remove it and add the success class
            actionsMessage.classList.remove("error-message");
            actionsMessage.classList.add("success-message");
            actionsMessage.innerText = "Product added successfully!";
        } else {
            actionsMessage.classList.add("error-message");
            actionsMessage.innerText =
                "Please fill all the fields or introduce a valid number";
        }
    };

    // UPDATE PRODUCT
    const updateProduct = () => {
        if (
            productName.value !== "" &&
            productQuantity.value !== "" &&
            productPrice.value !== "" &&
            !isNaN(productQuantity.value) &&
            !isNaN(productPrice.value)
        ) {
            // Get the id of the product to edit (set in listProducts.js)
            const productIdToUpdate = addEditButton.getAttribute("data-id");
            console.log(productIdToUpdate);

            if (productIdToUpdate) {
                // const productToUpdate = inventory.find(
                //     (product) => product.id === parseInt(productIdToUpdate)
                // );
                productManager.updateProductById(
                    parseInt(productIdToUpdate),
                    new Product(
                        parseInt(productIdToUpdate),
                        productName.value,
                        parseInt(productQuantity.value),
                        parseFloat(productPrice.value)
                    )
                );

                // console.log(productManager.listProducts());

                listProducts();
                showTotalInventory();

                actionsMessage.classList.remove("error-message");
                actionsMessage.classList.add("success-message");
                actionsMessage.innerText = "Product updated successfully!";
            }
        } else {
            actionsMessage.classList.add("error-message");
            actionsMessage.innerText =
                "Please fill all the fields or introduce a valid number";
        }
    };

    addEditButton.addEventListener("click", () => {
        if (addEditButton.innerText === "Add new") {
            addNewProduct();
            console.log("New product added");
        } else if (addEditButton.innerText === "Update") {
            updateProduct();
            console.log("Product updated");
        }
    });

    // If enter key is pressed, add / update the product
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (addEditButton.innerText === "Add new") {
                addNewProduct();
                console.log("New product added");
            } else if (addEditButton.innerText === "Update") {
                updateProduct();
                console.log("Product updated");
            }
        }
    });
};
