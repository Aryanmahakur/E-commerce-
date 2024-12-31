
document.addEventListener("DOMContentLoaded", function () {
    let productcontainer = document.getElementById("product-list-container");
    let productcontainer1 = document.getElementById("product-list-container1");
    let productcontainer2 = document.getElementById("product-list-container2");
    let productcontainer3 = document.getElementById("product-list-container3");
    let loginbtn = document.getElementById("login-btn");
    let arrowexit = document.getElementById("arrow-exit");
    let logincontainer = document.getElementById("login-container");
    let cartContainer = document.getElementById("cart-product-container");
    let cartSectionMain = document.getElementById("cart-section-main");
    let totalprice = document.getElementById("total-price");
    let handlingcharges = document.getElementById("Handling-charges");
    let finalprice = document.getElementById("final-price");
    let cartcount = document.getElementById("cart-count");

    // Event listener for login
    loginbtn.addEventListener("click", () => {
        logincontainer.style.display = "block";
    });
    arrowexit.addEventListener("click", () => {
        logincontainer.style.display = "none";
    });

    // Bill counter
    let totalproductprice = 0;
    let cartcountcontainer = 0;

    // Function to render products
    function renderProducts(product) {
        return `
        <div class="product-container" id="${product.id}">
            <img src="${product.mainimage}" alt="mainimages">
            <p class="name">${product.name}</p>
            <p class="quantity">${product.quantity}</p>
            <p class="price">₹ ${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>`;
    }

    // Using a loop that will bring data from products array
    products.forEach((product) => {
        if (product.category === "DairyProduct" && product.display === "mainpage") {
            productcontainer.innerHTML += renderProducts(product);
        } else if (product.category === "Snacks" && product.display === "mainpage") {
            productcontainer1.innerHTML += renderProducts(product);
        } else if (product.category === "Chips" && product.display === "mainpage") {
            productcontainer2.innerHTML += renderProducts(product);
        } else if (product.category === "Tea" && product.display === "mainpage") {
            productcontainer3.innerHTML += renderProducts(product);
        }
    });

    // Event listener for product container to redirect
    document.querySelectorAll(".product-container").forEach((item) => {
        item.addEventListener('click', (event) => {
            if (!event.target.classList.contains("add-to-cart")) {
                const productid = item.getAttribute('id');
                window.location.href = `product-details.html?id=${productid}`;
            }
        });
    });
  

    // Event listener for the add to cart button to stop propagation
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation(); // Stop the click event from propagating to the parent

            // Get the product ID from the parent element
            const productid = btn.parentElement.getAttribute('id');
            // Find the product in the products array
            const product = products.find(p => p.id === productid);

            // Retrieve existing cart data from local storage or initialize an empty array
            let cartdata = JSON.parse(localStorage.getItem("cart")) || [];

            // Push the selected product into the cart data array
            cartdata.push(product);

            // Debugging: Check data before storing
            console.log("Cart data before storing:", cartdata);

            // Update local storage with the new cart data
            localStorage.setItem("cart", JSON.stringify(cartdata));

            // Debugging: Check data after storing
            console.log("Cart data stored in localStorage:", JSON.parse(localStorage.getItem("cart")));

            // Retrieve and display the cart items
            displayCartItems();
        });
    });

    // Function to retrieve and display the cart items
    function displayCartItems() {
        let cartoutput = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("cartoutput:", cartoutput);

        cartContainer.innerHTML = ''; // Clear existing content

        // Reset total product price each time this function runs
        totalproductprice = 0;
        cartcountcontainer = 0; // Reset cart count
        
        cartoutput.forEach((item) => {
            // Ensure the price is parsed correctly
            cartcountcontainer++;
            cartcount.innerHTML = cartcountcontainer;
            let price = parseFloat(item.price);
            console.log("price:", price);

            // Update total product price
            totalproductprice += price;
            console.log("totalproductprice:", totalproductprice);
            totalprice.innerHTML = totalproductprice.toFixed(2); // Ensure 2 decimal places
            handlingcharges.innerHTML = "20"; // Correct ID and set value
            finalprice.innerHTML = (totalproductprice + parseFloat(handlingcharges.innerHTML)).toFixed(2); // Calculate and format final price
            document.getElementById("final-amt").innerHTML = finalprice.innerHTML;
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
              <div class="remove-item-all" id="remove-item-${item.id}" data-id="${item.id}">
                    <i class="fas fa-times" id="exit-icon-all"></i>
                </div>
                <img src="${item.mainimage}" alt="mainimage" id="cart-item-image">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="quantity">${item.quantity}</p>
                    <p class="cart-item-price"><i class="fas fa-rupee-sign" id="rupee-icon"></i> ${item.price}</p>
                </div>
                <div class="product-quantity" id="product-quantity">
                    <p class="quantity-decrease" id="quantity-decrease-${item.id}">-</p>
                    <p class="quantity-number" id="quantity-number-${item.id}">1</p>
                    <p class="quantity-increase" id="quantity-increase-${item.id}">+</p>
                </div>

            `;
            
            cartContainer.appendChild(cartItem);

            // Add event listeners for quantity change
            document.getElementById(`quantity-decrease-${item.id}`).addEventListener('click', () => {
                let quantityElement = document.getElementById(`quantity-number-${item.id}`);
                if(quantityElement.innerHTML > 1){
                    quantityElement.innerHTML--;
                }
                
            });

            document.getElementById(`quantity-increase-${item.id}`).addEventListener('click', () => {
                let quantityElement = document.getElementById(`quantity-number-${item.id}`);
                if(quantityElement.innerHTML < 10){
                    quantityElement.innerHTML++;
                }
             
            });

            // Add event listener for removing item
            document.getElementById(`remove-item-${item.id}`).addEventListener('click', () => {
                let productid = item.id; // Use the item id directly here
                console.log("Product ID:", productid);

                // Retrieve the cart data from localStorage
                let cartdata = JSON.parse(localStorage.getItem("cart")) || [];

                // Filter out the item with the specified product ID
                cartdata = cartdata.filter(cartItem => cartItem.id !== productid);

                // Update the localStorage with the new cart data
                localStorage.setItem("cart", JSON.stringify(cartdata));

                // Remove the DOM element
                document.getElementById(`remove-item-${item.id}`).closest('.cart-item').remove();
               // cartcountcontainer = 0; // Reset cart count
        
              
                    // Ensure the price is parsed correctly
                    cartcountcontainer--;
                    cartcount.innerHTML = cartcountcontainer;
                    let price = parseFloat(item.price);
                    console.log("price:", price);
                // Update the total price
                totalproductprice -= parseFloat(item.price);
                totalprice.innerHTML = totalproductprice.toFixed(2);
                finalprice.innerHTML = (totalproductprice + parseFloat(handlingcharges.innerHTML)).toFixed(2);
               document.getElementById("final-amt").innerHTML = finalprice.innerHTML;
            });
        });

        // Log the final price
        console.log("Final price:", finalprice.innerHTML);
    }

    // Initialize cart display on page load with additional logs
    console.log("Cart data on page load:", JSON.parse(localStorage.getItem("cart")));
    displayCartItems();

    // Toggle cart visibility
    
        console.log("DOM fully loaded and parsed");
        
        document.getElementById("cart-btn").addEventListener("click", () => {
            document.getElementById("cart-section-main").classList.toggle("active");
            console.log("Cart section toggled");
        });
    
        document.getElementById("exit-cart").addEventListener("click", () => {
            document.getElementById("cart-section-main").classList.remove("active");
            console.log("Cart section hidden");
        });
    
});
// for product listing with diffrent categories
document.querySelectorAll(".productredirect").forEach((product) => {
    product.addEventListener("click", () => {
        const datacategory = product.getAttribute('data-product');
        window.location.href = `product-list.html?category=${datacategory}`;
    });
});
document.querySelectorAll(".sub-banner").forEach((item) => {
    item.addEventListener('click', () => {
      
            const datacategory = item.getAttribute('data-product');
            window.location.href = `product-list.html?category=${datacategory}`;
        
    });
});


    // Select the category dropdown element
const selectElement = document.querySelector("#category");

// Add an event listener for the change event on the category dropdown
selectElement.addEventListener("change", () => {
    // Get the value of the selected option
    const selectedOptionValue = selectElement.value;
    console.log("Selected value:", selectedOptionValue);
    // Redirect to the product list page with the selected category as a query parameter
    window.location.href = `product-list.html?category=${selectedOptionValue}`;
});

// Get the navigation bar element
let navigationbar = document.getElementById("navigation-bar-11");

// Add an event listener for the click event on the hamburger menu icon
document.getElementById("hamburger").addEventListener("click", () => {
    // Toggle the 'active2' class on the navigation bar to show/hide it
    navigationbar.classList.toggle('active2');
});

// Add an event listener for the click event on the navigation exit icon
document.getElementById("nav-exit").addEventListener('click', () => {
    // Toggle the 'active2' class on the navigation bar to show/hide it
    navigationbar.classList.toggle('active2');
});

// Select all navigation links with the class 'nav-link'
const navLinks = document.querySelectorAll('.nav-link');

// Add an event listener for the click event on each navigation link
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        // Prevent the default action of the link (prevent page reload)
        event.preventDefault();
        // Get the value of the data-product attribute of the clicked link
        const product = link.getAttribute('data-product');
        if (product) {
            console.log("Selected product:", product);
            // Redirect to the product list page with the selected product category as a query parameter
            window.location.href = `product-list.html?category=${product}`;
        }
    });
});

