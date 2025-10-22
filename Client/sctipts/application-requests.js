function checkExistanceOfUser() {
  return false;
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
          tasksHolder.innerHTML += `<li>${element}</li>`;
        }
      });
    } catch (e) {
      console.error("Error parsing tasks data or processing array:", e);
    }
  };
  request.send();
}

function DBaddTask(user) {}
