export class Product {
    #id;
    #name;
    #quantity;
    #price;

    constructor(id, name, quantity, price) {
        this.#id = id;
        this.#name = name;
        this.#quantity = quantity;
        this.#price = price;
    }

    // GETTERS AND SETTERS
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        this.#name = newName;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(newQuantity) {
        this.#quantity = newQuantity;
    }

    get price() {
        return this.#price;
    }

    set price(newPrice) {
        this.#price = newPrice;
    }
}
