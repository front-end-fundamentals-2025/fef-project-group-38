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

//CART

//Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Function to update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

//Function to add a product to the cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

//Function to display cart items in the modal
function displayCartItems() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = ""; //Clear previous items

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price}`;
    cartItems.appendChild(li);
  });
}

//Add to cart button functionality
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

//Cart icon click to open modal
document.querySelector(".cart-icon").addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.getElementById("cart-modal");
  modal.style.display = "block";
  displayCartItems();
});

//Close the modal
document.querySelector(".close").addEventListener("click", () => {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "none";
});

//Checkout button functionality
document.getElementById("checkout-button").addEventListener("click", () => {
  alert("Coming soon");
});

//Update cart count on page load
window.onload = () => {
  updateCartCount();
  checkedLoggedIn(); //Existing login check
};
