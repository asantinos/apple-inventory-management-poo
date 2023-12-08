// import { inventory } from "./products.js"; // Assuming you have a products array
import { productManager } from "./main.js";

export const searchProduct = () => {
    const searchInput = document.getElementById("search-input");
    const inventoryData = document.getElementById("inventory-table-data");

    const inventory = productManager.listProducts();

    // addEventListener "input" checks when the input value changes
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();

        const filteredProducts = inventory.filter((product) =>
            product.name.toLowerCase().includes(searchText)
        );

        updateTable(filteredProducts);
    });

    function updateTable(filteredProducts) {
        // Empty the table to avoid duplicates
        inventoryData.innerHTML = "";

        // Create rows with the products that match the search (same code as in listProducts.js)
        filteredProducts.forEach((item) => {
            const dataRow = inventoryData.insertRow();

            const nameCell = dataRow.insertCell(0);
            const quantityCell = dataRow.insertCell(1);
            const priceCell = dataRow.insertCell(2);
            const actionsCell = dataRow.insertCell(3);

            nameCell.innerText = item.name;
            quantityCell.innerText = item.quantity;
            priceCell.innerText = `$${item.price}`;

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

                const index = inventory.find(
                    (product) => product.id === item.id
                );

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
                    const index = inventory.findIndex(
                        (product) => product.id === item.id
                    );

                    // It returns -1 if the product is not found
                    if (index !== -1) {
                        inventory.splice(index, 1);
                        dataRow.remove();

                        showTotalInventory();

                        actionsMessage.classList.remove("error-message");
                        actionsMessage.classList.add("success-message");
                        actionsMessage.innerText =
                            "Product deleted successfully!";
                        console.log("Product deleted successfully!");
                    }
                }
            });
        });
    }
};
