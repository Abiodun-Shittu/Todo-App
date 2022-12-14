const userLoginForm = document.querySelector(".form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.querySelector(".btn");


const url = "http://localhost:8000/api/v0/users/login";

// Focus on Email field when the page loads
window.onload = setTimeout(() => {
	emailInput.focus();
}, 1000);

// Login - Login user
// Method: POST
userLoginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: emailInput.value,
			password: passwordInput.value,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.message === "success") {
				submitButton.innerHTML = "Logging in...";
				localStorage.setItem("userId", data.data.id)
				localStorage.setItem("token", data.data.token);
				setTimeout(() => {
					window.location.href = "../todos/todos.html";
				}, 2000);
			} else if (data.message === "Unable to retrieve user") {
				alert("Email or Password is incorrect");
			} else if (data.message === "Unable to authenticate user.") {
				alert("Email or Password is incorrect");
			} else if (data.message === "Unprocessable data") {
				alert("All field are required")
			}
		})
		.catch((err) => console.log(err));
});
