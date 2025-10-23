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

  send() {
    const payload = JSON.stringify({
      method: this.method,
      url: this.url,
      body: this.body,
    });

    const rawResponse = network(payload);
    // while (rawResponse === undefined) {
    //   rawResponse = network(payload);
    // }
    console.log(rawResponse);
    try {
      const parsedResponse = JSON.parse(rawResponse);
      console.log(parsedResponse);
      this.response.status = parsedResponse.status;
      this.response.text = parsedResponse.text || parsedResponse.responseText;
      const responseText = this.response.text;
    } catch (e) {
      this.response.status = 500;
      this.response.text = "Error: Could not parse response.";
    }
    if (typeof this.onload === "function") {
      return this.onload();
    }
  }
}
