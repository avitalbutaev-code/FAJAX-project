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
    viewId === "login-template" ||
    viewId === "profile-template"
  ) {
    const template = document.getElementById(viewId);
    if (template) {
      const content = template.content.cloneNode(true);
      appContainer.appendChild(content);
      if (viewId === "login-template") {
        document
          .getElementById("login-submit")
          .addEventListener("click", () => {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            if (checkLogin()) {
              // currentUser=
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
        document.getElementById("reg-submit").addEventListener("click", () => {
          const username = document.getElementById("reg-username").value;
          const password = document.getElementById("reg-password").value;
          const confirm = document.getElementById("reg-confirm-password").value;
          if (password === confirm && !checkExistanceOfUser()) {
            alert("Registration successful! Please log in.");
            renderView("login-template");
          } else if (checkExistanceOfUser()) {
            alert("It seems you already have an account, please log in");
            renderView("login-template");
          } else {
            alert("Password must be confirmed properly");
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
      printAllTasks(currentUser);
      document.getElementById("profileBtn").addEventListener("click", () => {
        renderView("profile-template");
      });
      document.getElementById("logoutBtn").addEventListener("click", () => {
        renderView("login-template");
        currentUser = "";
      });
      document.getElementById("add-task").addEventListener("click", () => {
        addTask(currentUser);
      });
      document.getElementById("reduce-list").addEventListener("click", () => {
        deleteAllTasks(currentUser);
      });
    }

    if (viewId === "profile-template") {
      document.getElementById("user-info").innerHTML =
        printNameAndUsername(currentUser);
      document.getElementById("homeBtn").addEventListener("click", () => {
        renderView("home-template");
      });
      document.getElementById("logoutBtn").addEventListener("click", () => {
        renderView("login-template");
        currentUser = "";
      });
      document
        .getElementById("delete-profile")
        .addEventListener("click", () => {
          deleteUser(currentUser);
        });
      document
        .getElementById("resset-password")
        .addEventListener("click", () => {
          ressetPassword(currentUser);
        });
      document.getElementById("edit-name").addEventListener("click", () => {
        changeName(currentUser);
      });
    }
  }
}
