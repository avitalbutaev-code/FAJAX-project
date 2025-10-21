function server(request) {
  console.log(request);
  if (request.method === "POST" && request.url === "myserver/username/tasks") {
    console.log("sucsess");
    users.user.tasks.push(request.body);
    console.log(users.user.tasks);
  }
  if (request.method === "PUT" && request.url === "myserver") {
  }
  if (request.method === "GET" && request.url === "myserver") {
  }
  if (request.method === "GET" && request.url === "myserver") {
  }
  if (request.method === "GET" && request.url === "myserver") {
  }
  if (request.method === "DELETE" && request.url === "myserver") {
  }
}
