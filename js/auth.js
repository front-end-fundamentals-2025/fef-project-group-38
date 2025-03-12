//HAMBURGER TOGGLE MENU
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

//LOGIN/CREATE ACCOUNT

//Handle login submission
if (document.getElementById("login-form")) {
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "user.html"; //Redirect to user page
    } else {
      alert("Invalid email or password.");
    }
  });
}

//Check if user logged in
function checkedLoggedIn() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    if (
      window.location.pathname.endsWith("login.html") ||
      window.location.pathname.endsWith("create-account-html")
    ) {
      window.location.href = "user.html"; //Redirects to user page if logged in
    }
  } else if (window.location.pathname.endsWith("user.html")) {
    window.location.href = "login.html"; //Redirects to login page if not logged in
  }
}

//Handle create account form submission
if (document.getElementById("create-account-form")) {
  document
    .getElementById("create-account-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("last-name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((u) => u.email == email);

      if (userExists) {
        alert("An account with this email already exists.");
      } else {
        const newUser = { firstName, lastName, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created succesfully! Please log in.");
        window.location.href = "login.html"; //Redirect to login page
      }
    });
}

// Function to display user info on the user page
function displayUserInfo() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    // Update the user info on the page
    document.getElementById(
      "user-name"
    ).textContent = `Name: ${user.firstName} ${user.lastName}`;
    document.getElementById("user-email").textContent = `Email: ${user.email}`;
  }
}

//Handle logout
if (document.getElementById("logout-link")) {
  document.getElementById("logout-link").addEventListener("click", (e) => {
    e.preventDefault(); //Prevents the default link behaviiour
    localStorage.removeItem("loggedInUser"); //Clears the logged in user
    window.location.href = "login.html"; //Redirects to the login page
  });
}

//Check login status on page load
window.onload = checkedLoggedIn;

// CART

// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

//Function to calculate the total price
function calculateTotalPrice() {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace("kr", "")); //Remove kr and convert to a number
    return total + price;
  }, 0);
}

//Function to display the total price
function displayTotalPrice() {
  const totalPriceElement = document.getElementById("total-price");
  if (totalPriceElement) {
    const totalPrice = calculateTotalPrice();
    totalPriceElement.textContent = `${totalPrice}kr`;
  }
}

// Function to add a product to the cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCartItems();
  displayTotalPrice();
  alert(`${product.name} added to cart!`);
}

// Function to remove a product from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCartItems(); // Refresh the cart items display
  displayTotalPrice(); //Update total price
}

// Function to display cart items in the modal
function displayCartItems() {
  const cartItems = document.getElementById("cart-items");
  if (cartItems) {
    cartItems.innerHTML = ""; // Clear previous items

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add("cart-item");

      // Add product image
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.classList.add("cart-item-image");
      li.appendChild(img);

      // Add product name and price
      const details = document.createElement("div");
      details.classList.add("cart-item-details");
      details.innerHTML = `
        <p>${item.name}</p>
        <p>${item.price}</p>
      `;
      li.appendChild(details);

      // Add remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button");
      removeButton.addEventListener("click", () => removeFromCart(index));
      li.appendChild(removeButton); // Fix: Append removeButton to li

      cartItems.appendChild(li);
    });
  }
}

// Add to cart button functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const product = {
      name: e.target.closest(".product-info").querySelector("h1").textContent,
      price: e.target.closest(".product-info").querySelector(".price")
        .textContent,
      image: e.target.closest(".product-detail").querySelector("img").src,
    };
    addToCart(product);
  });
});

// Update cart count on page load
window.onload = () => {
  updateCartCount();
  displayCartItems();
  displayTotalPrice(); //Display the total price
  checkedLoggedIn(); // Existing login check
  displayUserInfo(); // Display user info on the user page
};
