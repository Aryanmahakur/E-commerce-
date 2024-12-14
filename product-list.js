
document.addEventListener("DOMContentLoaded", function () {
    const productcontainer = document.getElementById("product-list-display-container");

   

    function renderProductsitem(productss) {
        return `
        <div class="product-container" id="${productss.id}">
            <img src="${productss.mainimage}" alt="mainimages">
            <p class="name">${productss.name}</p>
            <p class="quantity">${productss.quantity}</p>
            <p class="price">MRP ${productss.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>`;
    }

    function geturlparameter(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    const datacategory = geturlparameter('category');
    console.log("Category: " + datacategory);

    products.forEach((product) => {
        if (product.category === datacategory) {
            productcontainer.innerHTML += renderProductsitem(product);
        }
    });

    document.getElementById("cart-btn").addEventListener("click", () => {
        document.getElementById("cart-section-main").classList.toggle("active");
        console.log("Cart section toggled");
    });
});

document.getElementById("exit-cart").addEventListener("click", () => {
    document.getElementById("cart-section-main").classList.remove("active");
    console.log("Cart section hidden");
});