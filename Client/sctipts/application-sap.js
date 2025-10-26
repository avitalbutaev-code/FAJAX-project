let currentUser;
document.addEventListener("DOMContentLoaded", () => {
  renderView("login-template");
});

function renderView(viewId) {
  const appContainer = document.getElementById("app-container");
  appContainer.innerHTML = "";
  if (
    viewId === "home-template" ||
    viewId === "register-template" ||
    viewId === "login-template"
  ) {
    const template = document.getElementById(viewId);
    if (template) {
      const content = template.content.cloneNode(true);
      appContainer.appendChild(content);

      if (viewId === "login-template") {
        document
          .getElementById("login-submit")
          .addEventListener("click", async () => {
            const username = String(document.getElementById("username").value);
            const password = String(document.getElementById("password").value);
            console.log(username, password);

            if (await checkLogin(username, password)) {
              currentUser = username;
              renderView("home-template");
            } else {
              alert("Hm...Check your username and password");
            }
          });
      }

      if (viewId === "register-template") {
        document.getElementById("loginBtn").addEventListener("click", () => {
          renderView("login-template");
        });
        document
          .getElementById("reg-submit")
          .addEventListener("click", async () => {
            // Mark as async
            const username = document.getElementById("reg-username").value;
            const name = document.getElementById("reg-name").value;
            const password = document.getElementById("reg-password").value;
            const confirm = document.getElementById(
              "reg-confirm-password"
            ).value;

            const userExists = await checkUserExists(username);

            if (password !== confirm) {
              alert("Password must be confirmed properly");
            } else if (userExists) {
              alert("It seems you already have an account, please log in");
              renderView("login-template");
            } else if (username && name && password && confirm) {
              await addNewUser(username, name, password);
              alert("Registration successful! Please log in.");
              renderView("login-template");
            } else {
              alert("Please fill in all fields.");
            }
          });
      }
    }

    if (viewId === "login-template") {
      document.getElementById("registerBtn").addEventListener("click", () => {
        renderView("register-template");
      });
    }

    if (viewId === "home-template") {
      document.getElementById("upper-name").innerHTML = "";
      document.getElementById("upper-name").innerHTML = currentUser;
      printAllTasks(currentUser);

      document.getElementById("logoutBtn").addEventListener("click", () => {
        renderView("login-template");
        currentUser = "";
      });

      document.getElementById("add-task").addEventListener("click", () => {
        const taskInput = document.getElementById("task-input");
        const newTask = taskInput.value.trim();
        if (newTask) {
          addTask(currentUser, newTask);
          taskInput.value = "";
        } else {
          alert("please enter a task.");
        }
      });

      document.getElementById("reduce-list").addEventListener("click", () => {
        deleteAllTasks(currentUser);
      });
    }
  }
}
