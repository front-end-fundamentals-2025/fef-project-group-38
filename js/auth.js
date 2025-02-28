//Check if user logged in
function checkedLoggedIn() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    if (
      window.location.pathname.endsWith("login.html") ||
      window.location.pathname.endsWith("create-account-html")
    ) {
      window.location.href = "user.html"; //Redirects to user page if logged in
    } else if (window.location.pathname.endsWith("user.html")) {
      document.getElementById("user-info").textContent =
        "Name: Jane Doe    Email: janedoe@gmail.com";
    }
  } else if (window.location.pathname.endsWith("user.html")) {
    window.location.href = "login.html"; //Redirects to login page if not logged in
  }
}

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

//Check login status on page load
window.onload = checkedLoggedIn;
