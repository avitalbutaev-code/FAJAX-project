function server(requestString) {
  console.log("In server");
  const request = JSON.parse(requestString);
  const parsedURL = parseURL(request.url);
  console.log(parsedURL);
  const username = parsedURL.id;
  const itemIndex = parsedURL.subsubresource;

  // --- GET Requests ---
  if (request.method === "GET" && parsedURL.resource === "myserver") {
    if (parsedURL.subresource === "tasks") {
      const tasksString = DBgetTasks(username);

      if (tasksString) {
        return JSON.stringify({ status: 200, text: tasksString });
      } else {
        return JSON.stringify({
          status: 404,
          text: "Tasks or user not found.",
        });
      }
    }
    if (parsedURL.subresource === "name") {
      const name = DBgetName(username);
      return JSON.stringify({ status: 200, text: JSON.stringify(name) });
    }
    if (parsedURL.subresource === "password") {
      console.log("Checking password");
      const password = DBgetPassword(username);
      if (password) {
        return JSON.stringify({ status: 200, text: password });
      } else {
        return JSON.stringify({
          status: 404,
          text: "Wrong password.",
        });
      }
    }
    if (parsedURL.subresource === null) {
      console.log(username);
      const answer = DBexists(username);

      if (answer) {
        return JSON.stringify({ status: 200, text: true });
      } else {
        return JSON.stringify({
          status: 404,
          text: "User not found.",
        });
      }
    }
  }

  // --- POST/PUT/DELETE logic would go here ---

  // --- PUT here ---
  if (request.method === "PUT" && parsedURL.resource === "myserver") {
    if (parsedURL.subresource === "tasks") {
      const hasChaneged = DBaddTask(username, request.body);
      console.log(hasChaneged);
      if (hasChaneged) {
        return JSON.stringify({
          status: 200,
          text: "Has been added successfully",
        });
      } else {
        return JSON.stringify({
          status: 404,
          text: "Tasks or user not found.",
        });
      }
    }
  }
  //DELETE goes here
  if (request.method === "DELETE" && parsedURL.resource === "myserver") {
    if (
      parsedURL.subresource === "tasks" &&
      parsedURL.subsubresource === "all"
    ) {
      const deletedSuccessfully = DBdeleteAllTask(username);
      if (deletedSuccessfully) {
        return JSON.stringify({
          status: 200,
          text: "All tasks deleted successfully",
        });
      } else {
        return JSON.stringify({
          status: 404,
          text: "User not found or deletion failed.",
        });
      }
    }
    if (parsedURL.subresource === "tasks" && parsedURL.subsubresource) {
      const deletedSuccessfully = DBdeleteTask(username, itemIndex);
      if (deletedSuccessfully) {
        return JSON.stringify({
          status: 200,
          text: "the task has been deleted successfully",
        });
      } else {
        return JSON.stringify({
          status: 404,
          text: "User not found or deletion failed.",
        });
      }
    }
  }

  //POST here
  if (request.method === "POST" && parsedURL.resource === "myserver") {
    if (parsedURL.subresource === "register") {
      const userObject = JSON.parse(request.body);
      const registrationUsername = username;
      const hasAdded = DBsavesNewUser(registrationUsername, userObject);
      console.log(hasAdded);
      if (hasAdded) {
        return JSON.stringify({
          status: 200,
          text: "Has been added successfully",
        });
      } else {
        return JSON.stringify({
          status: 404,
          text: "Registration failed",
        });
      }
    }
  }
}
