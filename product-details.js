
// Function to get URL parameter
function geturlparameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// Retrieve the 'id' parameter from the URL
const productsid = geturlparameter('id');
console.log("id: " + productsid);


// Find the product with the matching 'id'
const product = products.find(p => p.id === productsid);
console.log("product id: ", product);
if(product){
    document.getElementById("product-image").src = product.mainimage;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent =`MRP ${product.price}`;
    document.getElementById("product-description").textContent = product.description;
let subimages = document.getElementById("sub-images");
product.subimage.forEach((image,index) => {
     const imgelement = document.createElement("img");
     imgelement.src = image;
     imgelement.alt = `subimage ${index + 1}`;
     imgelement.classList.add("sub-image");
     imgelement.id = `subimage-${index + 1}`;
     subimages.appendChild(imgelement);
     localStorage.clear();
     console.log("All local storage data cleared.");
     

});
// Get the main image element
const mainimage = document.getElementById("product-image");

// Get all sub-image elements within the container with the id "sub-image"
const subimagesa = document.querySelectorAll("#sub-images .sub-image");

// Attach event listeners to each sub-image
subimagesa.forEach((subimage, index) => {
    // Attach a click event listener to each sub-image
    subimage.addEventListener("click", () => {
        // Store the current src of the main image
        const tempcsrc = mainimage.src;
        // Set the main image src to the clicked sub-image src
        mainimage.src = subimage.src;
        // Set the clicked sub-image src to the stored main image src
        subimage.src = tempcsrc;
    });

})
}
