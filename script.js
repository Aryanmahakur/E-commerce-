let productcontainer = document.getElementById("product-list-container");
let productcontainer1= document.getElementById("product-list-container1");
let productcontainer2= document.getElementById("product-list-container2");
let productcontainer3= document.getElementById("product-list-container3");

console.log(productcontainer);
if (!productcontainer) {
    console.log(" id with product-list-containernot found");
}
// this is the template for product display
function renderProducts(products) {
    return `
    <div class="dairyproductcontainer" id="${products.id}">
        <img src="${products.mainimage}" alt="mainimages" id="${products.id}">
        <p class="name">${products.name}</p>
        <p class="quantity">500ml</p>
       <p class="price">
    ${products.price}
   
    
    </p>
    <button class="add-to-cart">Add to Cart</button>

    `;
}
//using a loop that will bring data from products array
products.forEach((product) => {
    console.log("products array"+product);
    
    if (product.category == "Dairy Product") {
        productcontainer.innerHTML += renderProducts(product);
    
    }
})
products.forEach((product) => {
    console.log("products array"+product);
    
    if (product.category == "Snacks") {
        productcontainer1.innerHTML += renderProducts(product);
    
   
 }
})
products.forEach((product) => {
    console.log("products array"+product);
    
    if (product.category == "Chips") {    
        productcontainer2.innerHTML += renderProducts(product);
    
   
 }
})

products.forEach((product) => {
    console.log("products array"+product);
    
    if (product.category == "Tea") {    
        productcontainer3.innerHTML += renderProducts(product);
    
   
 }
})

document.querySelectorAll(".dairyproductcontainer").forEach((item) => {
item.addEventListener('click', () => {
    const productsid = item.getAttribute('id');
    console.log("id"+productsid);
    window.location.href = `product-details.html?id=${productsid}`;
})
});
