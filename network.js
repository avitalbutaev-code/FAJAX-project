function network(requestString) {
  console.log("In network");
  // if (Math.random() > 0.5)
  if (parseURL(JSON.parse(requestString).url).resource === "myserver") {
    return server(requestString);
  } else {
    console.log("Can't get to the source");
  }
  if (JSON.parse(requestString).resourse.status === "200") {
    return requestString;
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
