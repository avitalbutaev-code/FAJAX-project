function checkLogin() {
  if (checkExistanceOfUser() && checkPassword()) {
    return true;
  }
  return false;
}
function checkExistanceOfUser() {
  return false;
}
function checkPassword() {
  return true;
}
function printAllTasks(username) {
  const request = new Request();
  request.open("GET", "myserver/" + username + "tasks");
  request.send();
  const responce = request.responce;
  request.forEach((element) => {
    if (element !== undefined)
      document.getElementById("tasks-holder").innerHTML =
        "<li>" + element + "</li>";
  });
}
function addTask(user) {}
