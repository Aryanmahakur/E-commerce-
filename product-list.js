
document.addEventListener("DOMContentLoaded", function () {
    const productcontainer = document.getElementById("product-list-display-container");



    function renderProductsitem(productss) {
        return `
        <div class="product-container" id="${productss.id}">
            <img src="${productss.mainimage}" alt="mainimages">
            <p class="name">${productss.name}</p>
            <p class="quantity">${productss.quantity}</p>
            <p class="price">₹ ${productss.price}</p>
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


    const productContainer = document.getElementById("product-list-display-container");

    // Event delegation to handle clicks on dynamically created elements
    productContainer.addEventListener("click", (event) => {
        const productElement = event.target.closest(".product-container");
        if (productElement) {
            const dataId = productElement.getAttribute('id');
            window.location.href = `product-details.html?id=${dataId}`;
        }
    });


});