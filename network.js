function network(requestString) {
  console.log("In network");
  // if (Math.random() > 0.5)
  if (parseURL(JSON.parse(requestString).url).resource === "myserver") {
    server(requestString);
  } else {
    console.log("Can't get to the source");
  }
}
function parseURL(url) {
  const parts = url.split("/");
  return {
    resource: parts[0] || null,
    id: parts[1] || null,
    subresource: parts[2] || null,
  };
}
