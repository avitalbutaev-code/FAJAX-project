function checkExistanceOfUser() {
  return true;
}
function checkPassword() {
  return true;
}

function checkLogin() {
  if (checkExistanceOfUser() && checkPassword()) {
    return true;
  }
  return false;
}
function printAllTasks(username) {
  const request = new Request();
  request.open("GET", `myserver/${username}/tasks`);
  request.onload = () => {
    if (request.response.status != 200) {
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
          //line for hover: adds class="task-item" and data-index
          tasksHolder.innerHTML += `<li class="task-item" data-index"${index}>${element}</li>`;
        }
      });
    } catch (e) {
      console.error("Error parsing tasks data or processing array:", e);
    }
  };

  request.send();
}

function addTask(username, newTask) {
  const request = new Request();
  request.open("PUT", `myserver/${username}/tasks`, newTask);
  request.onload = () => {
    printAllTasks(username);
  };
  request.send();
}

function deleteAllTasks(username) {
  const request = new Request();
  request.open("DELETE", `myserver/${username}/tasks/all`);
  request.onload = () => {
    if (request.response.status === 200) {
      console.log("All tasks deleted successfully.");
      printAllTasks(username);
    } else {
      console.error("Failed to delete all tasks:", request.response.text);
    }
  };
  request.send();
}

function deleteTask(username, index) {
  const request = new Request();
  request.open("DELETE", `myserver/${username}/tasks/${index}`);
  request.onload = () => {
    if (request.response.status === 200) {
      console.log("the task was deleted successfully.");
      printAllTasks(username);
    } else {
      console.error("Failed to delete the task:", request.response.text);
    }
  };
  request.send();
}
