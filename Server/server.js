function server(requestString) {
  console.log("In server");
  const request = JSON.parse(requestString);
  if (request.method === "GET" && parseURL(request.url).source === "myserver") {
    if (parseURL(request.url).id === "users") {
      request.response.text = DBget`${parseURL(request.url).subresource}`();
      request.response.status = "200";
      network(JSON.stringify(request));
    }
    return;
  }
  if (request.method === "POST" && request.url === "myserver/username/") {
    request.body;
  }
  if (
    request.method === "PUT" &&
    request.url === "myserver/username/attribute"
  ) {
    if (request.url === "myserver/username/tasks") {
      //add task
    }
  }
  if (request.method === "GET" && request.url === "myserver/username") {
    // user info-name,username
  }

  if (request.method === "DELETE" && request.url === "myserver/username") {
  }
  if (
    request.method === "DELETE" &&
    request.url === "myserver/username/attribute"
  ) {
  }
}
