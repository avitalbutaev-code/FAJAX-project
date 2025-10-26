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

  addTaskPrivate(newtask) {
    this._tasks.push(newtask);
  }
  removeTaskPrivate(arrayIndex) {
    if (arrayIndex === 0 || arrayIndex > this._tasks.length - 1) {
      console.log("Cannot remove this item.");
    } else {
      this._tasks.splice(arrayIndex, 1);

      console.log("Removed successfully.");
    }
  }
  deleteAllTaskPrivate() {
    this._tasks.splice(1, this._tasks.length - 1);

    console.log("Deleted all the tasks successfully.");
  }
}
function DBsavesNewUser(username, userObject) {
  const key = `${username}`;
  localStorage.setItem(key, JSON.stringify(userObject));
  console.log(`User '${username}' saved under key '${key}'.`);
  return true;
}

function DBchangePassword(username, newpassword) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  const userObject = JSON.parse(usernameJSON);
  userObject._password = newpassword;
  DBsavesNewUser(username, userObject);
  console.log(`The new password ${newpassword} was saved.`);
  return true;
}

function DBchangeName(username, newname) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  const userObject = JSON.parse(usernameJSON);
  userObject._name = newname;
  DBsavesNewUser(username, userObject);
  console.log(`The new name ${newname} was saved.`);
  return true;
}

function DBdeleteUser(username) {
  localStorage.removeItem(username);
  console.log(`User '${username}' was deleted successfully.`);
  return true;
}

function DBdeleteTask(username, taskIndex) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  const userObject = JSON.parse(usernameJSON);
  const itemArray = userObject._tasks;

  if (taskIndex === 0 || taskIndex > itemArray.length - 1) {
    return console.log("Cannot remove this item.");
  } else {
    itemArray.splice(taskIndex, 1);
  }

  DBsavesNewUser(username, userObject);
  console.log("Task was deleted successfully.");
  return true;
}

function DBdeleteAllTask(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  const userObject = JSON.parse(usernameJSON);
  const itemArray = userObject._tasks;
  itemArray.splice(1, itemArray.length - 1);
  DBsavesNewUser(username, userObject);
  console.log("All the tasks were deleted successfully.");
  return true;
}

function DBaddTask(username, newtask) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  const userObject = JSON.parse(usernameJSON);
  const itemArray = userObject._tasks;
  itemArray.push(newtask);
  DBsavesNewUser(username, userObject);
  console.log("New task saved successfully.");
  return true;
}

function DBgetName(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  else {
    const userObject = JSON.parse(usernameJSON);
    return userObject._name;
  }
}

function DBgetPassword(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  else {
    const userObject = JSON.parse(usernameJSON);
    return userObject._password;
  }
}

function DBgetTasks(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!DBexists(username)) return false;
  else {
    const userObject = JSON.parse(usernameJSON);
    return JSON.stringify(userObject._tasks);
  }
}
function DBexists(username) {
  const usernameJSON = localStorage.getItem(username);
  if (!usernameJSON) {
    console.error("User " + username + " not found in Local Storage.");
    return false;
  }
  return true;
}
