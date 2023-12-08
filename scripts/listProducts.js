import { productManager } from "./main.js";
import { showTotalInventory } from "./showTotalInventory.js";

export const listProducts = () => {
    const inventoryData = document.getElementById("inventory-table-data");
    const productName = document.getElementById("product-name-input");
    const productPrice = document.getElementById("product-price-input");
    const productQuantity = document.getElementById("product-quantity-input");
    const addEditButton = document.getElementById("add-edit-button");
    const actionsMessage = document.getElementById("actions-message");

    // DELETE ALL ROWS TO AVOID DUPLICATES
    while (inventoryData.firstChild) {
        inventoryData.removeChild(inventoryData.firstChild);
    }

    // CREATE ROWS FOR EACH PRODUCT
    productManager.listProducts().forEach((item) => {
        const dataRow = inventoryData.insertRow();

        const nameCell = dataRow.insertCell(0);
        const quantityCell = dataRow.insertCell(1);
        const priceCell = dataRow.insertCell(2);
        const actionsCell = dataRow.insertCell(3);

        nameCell.innerText = item.name;
        quantityCell.innerText = item.quantity;
        priceCell.innerText = `$${item.price.toFixed(2)}`;

        inventoryData.appendChild(dataRow);

        // EDIT BUTTON
        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerText = "EDIT";
        actionsCell.appendChild(editButton);
        editButton.addEventListener("click", () => {
            const editButtons = document.getElementById(
                "add-edit-buttons-wrapper"
            );

            const index = productManager
                .listProducts()
                .find((product) => product.id === item.id);

            if (index !== -1) {
                productName.value = item.name;
                productQuantity.value = item.quantity;
                productPrice.value = item.price;
            }

            // Give the button an attribute to know which product is being edited (used in addEditProduct.js)
            addEditButton.setAttribute("data-id", item.id);

            // CANCEL BUTTON
            if (!document.getElementById("cancel-button")) {
                const cancelButton = document.createElement("button");
                cancelButton.innerText = "Cancel";

                // Set an id to the cancel button to avoid creating multiple cancel buttons
                cancelButton.id = "cancel-button";
                editButtons.appendChild(cancelButton);

                // Change buttons and empty inputs
                cancelButton.addEventListener("click", () => {
                    editButtons.removeChild(cancelButton);
                    productName.value = "";
                    productQuantity.value = "";
                    productPrice.value = "";
                    addEditButton.innerText = "Add new";
                });

                // If the ESC key is pressed, remove the cancel button and empty the inputs
                document.addEventListener("keydown", (event) => {
                    if (event.key === "Escape") {
                        editButtons.removeChild(cancelButton);
                        productName.value = "";
                        productQuantity.value = "";
                        productPrice.value = "";
                        addEditButton.innerText = "Add new";
                    }
                });
            }

            addEditButton.innerText = "Update";
        });

        // DELETE BUTTON
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "DELETE";
        actionsCell.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
            if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                // Search index of the product to delete
                const index = productManager
                    .listProducts()
                    .findIndex((product) => product.id === item.id);

                // It returns -1 if the product is not found
                if (index !== -1) {
                    // productManager.listProducts().splice(index, 1);

                    productManager.deleteProductById(item.id);
                    dataRow.remove();

                    showTotalInventory();

                    actionsMessage.classList.remove("error-message");
                    actionsMessage.classList.add("success-message");
                    actionsMessage.innerText = "Product deleted successfully!";
                    console.log("Product deleted successfully!");
                }
            }
        });
    });
};
