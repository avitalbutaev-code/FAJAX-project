class Request {
  constructor() {
    this.body = "";
    this.method = "";
    this.url = "";
    this.response = {
      status: "",
      text: "",
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

  send() {
    const payload = JSON.stringify({
      method: this.method,
      url: this.url,
      body: this.body,
    });
    const rawResponse = network(payload);
    try {
      const parsedResponse = JSON.parse(rawResponse);
      this.response.status = parsedResponse.status;
      this.response.text = parsedResponse.text || parsedResponse.responseText;
    } catch (e) {
      this.response.status = 500;
      this.response.text = "Error: Could not parse response.";
    }
    if (typeof this.onload === "function") {
      this.onload();
    }
  }
}
