class User {
  constructor(name, password) {
    this._name = name;
    this._password = password;
    this._tasks = [undefined];
  }
  get name() {
    return this._name;
  }
  get password() {
    return this._password;
  }
  get tasks() {
    return this._tasks;
  }
  set name(newname) {
    this._name = newname;
  }
  set password(newpassword) {
    this._password = newpassword;
  }

  addTask(newtask) {
    this._tasks.push(newtask);
  }
  removeTask(arrayIndex) {
    if (arrayIndex === 0 || arrayIndex > this._tasks.length - 1) {
      console.log("cannot remove this item");
    } else {
      this._tasks.splice(arrayIndex, 1);
      console.log("removed sucsesfully");
    }
  }
  deleteAllTask() {
    this._tasks.splice(1, this._tasks.length - 1);
    console.log("deleted all the tasks sucssesfully");
  }
}

const sharonUser = new User("sharon", "4321");
sharonUser.addTask("Buy groceries");
sharonUser.addTask("Walk the dog");
sharonUser.password = "1212";

const davidUser = new User("david", "5555");
davidUser.addTask("Buy groceries");
davidUser.addTask("Buy cat");

function savesNewUser(username, userObject) {
  const key = `${username}`;
  localStorage.setItem(key, JSON.stringify(userObject));
  console.log(`User '${username}' saved under key '${key}'.`);
}
savesNewUser("pinkie", sharonUser);
savesNewUser("lol", davidUser);

function changePassword(username, newpassword) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  }
  const userObject = JSON.parse(usernameJSON);
  userObject._password = newpassword;
  savesNewUser(username, userObject);
  console.log(`the new password ${newpassword} was saved`);
}

function changename(username, newname) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  }
  const userObject = JSON.parse(usernameJSON);
  userObject._name = newname;
  savesNewUser(username, userObject);
  console.log(`the new name ${newname} was saved`);
}
function deleteUser(username) {
  //in case the username dont exist it will not be an eror but simply will not do anything
  localStorage.removeItem(username);
  console.log(` User '${username}' was deleted sucsessfully`);
}
function deleteTask(username, taskIndex) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  }
  const userObject = JSON.parse(usernameJSON);
  const itemArray = userObject._tasks;

  if (taskIndex === 0 || taskIndex > itemArray.length - 1) {
    return console.log("cannot remove this item");
  } else {
    itemArray.splice(taskIndex, 1);
  }

  savesNewUser(username, userObject);
  console.log("task was deleted sucsesfuly");
}
function deleteAllTask(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  }
  const userObject = JSON.parse(usernameJSON);
  const itemArray = userObject._tasks;
  itemArray.splice(1, itemArray.length - 1);
  savesNewUser(username, userObject);
  console.log("all the tasks were deleted sucsesfuly");
}
function addTask(username, newtask) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  }
  const userObject = JSON.parse(usernameJSON);
  const itemArray = userObject._tasks;
  itemArray.push(newtask);
  savesNewUser(username, userObject);
  console.log("new task saved sucsesfuly");
}
function getName(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  } else {
    const userObject = JSON.parse(usernameJSON);
    return userObject._name;
  }
}
function getpassword(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  } else {
    const userObject = JSON.parse(usernameJSON);
    return userObject._password;
  }
}
function getTaskList(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error(` User '${username}' not found in Local Storage.`);
    return;
  } else {
    const userObject = JSON.parse(usernameJSON);
    return JSON.stringify(userObject._tasks);
  }
}
