function server(requestString) {
  console.log("In server");
  const request = JSON.parse(requestString);
  const parsedURL = parseURL(request.url);
  console.log(parsedURL);
  const username = parsedURL.id;
  console.log(username);
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
  if (request.method === "POST" && parsedURL.resource === "myserver") {
    if (parsedURL.id === "register") {
    }
  }
  return JSON.stringify({
    status: 400,
    text: "Bad Request or Unimplemented Endpoint.",
  });
}
