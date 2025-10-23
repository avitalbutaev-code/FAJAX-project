function checkUserExists(username) {
  const request = new FajaxRequest();
  console.log("GET", "myserver/" + username);
  request.open("GET", "myserver/" + username);
  request.onload = () => {
    if (request.response.status != 200) {
      console.error(
        `User not found. Status: ${request.response.status}`,
        request.response.text
      );
      return false;
    }
    console.log("Exists");
    return true;
  };
  return request.send();
}
function getUserPassword(username) {
  const request = new FajaxRequest();
  request.open("GET", `myserver/${username}/password`);
  console.log(request);
  request.onload = () => {
    if (request.response.status != 200) {
      console.error(
        `User not found. Status: ${request.response.status}`,
        request.response.text
      );
      return false;
    }
    // console.log(`this user password ` + request.response.text);
    // console.log(request.response.text);
    const result = request.response.text;
    return result;
  };
  return request.send();
}
function checkPassword(username, password) {
  const userPassword = getUserPassword(username);
  console.log(userPassword, password);
  console.log(userPassword === password);
  return userPassword === password;
}

function checkLogin(username, password) {
  if (checkUserExists(username) && checkPassword(username, password)) {
    console.log(checkUserExists() && checkPassword());
    return true;
  }
  return false;
}
function getUserInfo(username) {}
function printAllTasks(username) {
  const request = new FajaxRequest();
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
function addUser(username, name, password) {
  if (checkUserExists(username)) {
    alert("Username already taken");
  } else {
    const request = new FajaxRequest();
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
}
