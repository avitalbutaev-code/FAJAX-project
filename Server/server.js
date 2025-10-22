function server(requestString) {
  console.log("In server");
  const request = JSON.parse(requestString);
  const parsedURL = parseURL(request.url);
  const username = parsedURL.id;

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
  }

  // --- POST/PUT/DELETE logic would go here ---

  return JSON.stringify({
    status: 400,
    text: "Bad Request or Unimplemented Endpoint.",
  });
}
