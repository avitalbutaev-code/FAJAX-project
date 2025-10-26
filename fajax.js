class FajaxRequest {
  constructor() {
    this.body = "";
    this.method = "";
    this.url = "";
    this.response = {
      status: "",
      text: null,
    };
    this.onload = null;
  }

  open(method, url, body) {
    this.method = method;
    this.url = url;
    if (body === null || body === undefined) {
      this.body = null;
    } else {
      this.body = body;
    }
  }

  // Changed to async to await the network response
  async send() {
    const payload = JSON.stringify({
      method: this.method,
      url: this.url,
      body: this.body,
    });

    // Await the asynchronous network call
    const rawResponse = await network(payload);

    console.log("Raw Response received:", rawResponse);

    try {
      const parsedResponse = JSON.parse(rawResponse);
      this.response.status = parsedResponse.status;
      this.response.text = parsedResponse.text || parsedResponse.responseText;
    } catch (e) {
      this.response.status = 500;
      this.response.text = "Error: Could not parse response.";
    }

    // Call onload, but the main function returns the response object
    if (typeof this.onload === "function") {
      this.onload();
    }

    return this.response;
  }
}
