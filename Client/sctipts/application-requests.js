async function checkUserExists(username) {
  const request = new FajaxRequest();
  console.log("GET", "myserver/" + username);
  request.open("GET", "myserver/" + username);

  const response = await request.send();

  if (response.status != 200) {
    console.error(`User not found. Status: ${response.status}`, response.text);
    return false;
  }
  console.log("Exists");
  return true;
}

async function getUserPassword(username) {
  const request = new FajaxRequest();
  request.open("GET", `myserver/${username}/password`);

  const response = await request.send();

  if (response.status != 200) {
    alert("Not found((");
    console.error(`User not found. Status: ${response.status}`, response.text);
    return false;
  }

  return response.text;
}

async function checkPassword(username, password) {
  const userPassword = await getUserPassword(username);

  console.log(userPassword, password);
  console.log(userPassword === password);

  return userPassword === password;
}

async function checkLogin(username, password) {
  const userExists = await checkUserExists(username);
  if (userExists === false) {
    return;
  }
  const passwordMatches = await checkPassword(username, password);

  if (userExists && passwordMatches) {
    console.log("Login successful");
    return true;
  } else {
    alert("User not found");
    return false;
  }
}

function printAllTasks(username) {
  const request = new FajaxRequest();
  request.open("GET", `myserver/${username}/tasks`);
  request.onload = () => {
    if (request.response.status != 200) {
      alert("Not found((");
      console.error(
        `Failed to load tasks. Status: ${request.response.status}`,
        request.response.text
      );
      return;
    }
    const tasksJSONString = request.response.text;

    try {
      const tasksArray = JSON.parse(tasksJSONString);
      const tasksHolder = document.getElementById("tasks-holder");
      tasksHolder.innerHTML = "";
      tasksArray.forEach((element, index) => {
        if (index !== 0) {
          tasksHolder.innerHTML += `<li class="task-item" data-index="${index}">${element}</li>`;
        }
      });

      tasksHolder.querySelectorAll(".task-item").forEach((listItem) => {
        listItem.addEventListener("click", (e) => {
          const indexToDelete = listItem.getAttribute("data-index");
          if (indexToDelete) {
            deleteTask(username, indexToDelete);
          }
        });
      });
    } catch (e) {
      console.error("Error parsing tasks data or processing array:", e);
    }
  };

  request.send();
}

function addTask(username, newTask) {
  const request = new FajaxRequest();
  request.open("PUT", `myserver/${username}/tasks`, newTask);
  request.onload = () => {
    if (request.response.status === 200) {
      console.log("All tasks deleted successfully.");
    } else {
      alert("Not found((");
      console.error("Failed to add task:", request.response.text);
    }
    printAllTasks(username);
  };
  request.send();
}

function deleteAllTasks(username) {
  const request = new FajaxRequest();
  request.open("DELETE", `myserver/${username}/tasks/all`);
  request.onload = () => {
    if (request.response.status === 200) {
      console.log("All tasks deleted successfully.");
      printAllTasks(username);
    } else {
      alert("Not found((");
      console.error("Failed to delete all tasks:", request.response.text);
    }
  };
  request.send();
}

function deleteTask(username, index) {
  const request = new FajaxRequest();
  request.open("DELETE", `myserver/${username}/tasks/${index}`);
  request.onload = () => {
    if (request.response.status === 200) {
      console.log("the task was deleted successfully.");
      printAllTasks(username);
    } else {
      alert("Not found((");
      console.error("Failed to delete the task:", request.response.text);
    }
  };
  request.send();
}

async function addNewUser(username, name, password) {
  const request = new FajaxRequest();
  request.open(
    "POST",
    `myserver/${username}/register`,
    JSON.stringify({
      _name: name,
      _password: password,
      _tasks: [undefined],
    })
  );

  const response = await request.send();

  if (response.status != 200) {
    alert("Not found((");
    console.error(
      `Failed to add user. Status: ${response.status}`,
      response.text
    );
    return false;
  }
  return true;
}
