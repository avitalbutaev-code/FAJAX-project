function network(requestString) {
  console.log("In network");

  let requestPayload;
  try {
    requestPayload = JSON.parse(requestString);
  } catch (e) {
    return JSON.stringify({
      status: 500,
      text: "Error: Malformed request payload.",
    });
  }

  const parsedURL = parseURL(requestPayload.url);
  if (parsedURL.resource === "myserver") {
    return server(requestString);
  } else {
    console.log("Can't get to the source");
    return JSON.stringify({
      status: 404,
      text: "Network destination not recognized.",
    });
  }
}

function parseURL(url) {
  const parts = url.split("/");
  return {
    resource: parts[0] || null,
    id: parts[1] || null,
    subresource: parts[2] || null,
    subsubresource: parts[3] || null, // e.g., "all" or the task index
  };
}
