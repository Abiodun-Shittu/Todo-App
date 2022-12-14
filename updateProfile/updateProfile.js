const username = document.querySelector("#username");
const updateUserForm = document.querySelector(".form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const navPages = document.querySelector(".sidebar");

const url = "http://localhost:8000/api/v0/users/";
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

window.onload = () => {
	if (!token) {
		window.location.href = "../login/login.html";
	}

	// GET user information
	setTimeout(() => {
		fetch(url + userId, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				username.innerHTML = data.data.name.split(" ")[0];
			})
			.catch((error) => console.log(error));
	}, 1000);

	updateUserForm.addEventListener("submit", (e) => {
		e.preventDefault();

		// Update User information
		setTimeout(() => {
			fetch(url + userId, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: nameInput.value,
					email: emailInput.value,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message === "Unauthorized") {
						window.location.href = "../login/login.html";
					} else if (data.message === "User Successfully Updated") {
						console.log("User information updated", data);
						window.location.href = "../userProfile/profile.html";
					}
				})
				.catch((err) => console.log(err));
		}, 1000);
	});
};

navPages.addEventListener("click", (e) => {
	e.preventDefault();

	const todosPage = e.target.id === "todos-page";
	const createTodoPage = e.target.id === "new-todo-page";
	const profilePage = e.target.id == "profile-page";

	setTimeout(() => {
		if (todosPage) {
			window.location.href = "../todos/todos.html";
		}

		if (createTodoPage) {
			window.location.href = "../createTodo/todo.html";
		}

		if (profilePage) {
			window.location.href = "../userProfile/profile.html";
		}
	}, 1500);
});
