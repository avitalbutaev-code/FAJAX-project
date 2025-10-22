class Request {
  constructor() {
    this.body = "";
    this.method = "";
    this.url = "";
    this.response = "";
  }
  open(method, url, body) {
    this.method = method;
    this.url = url;
    if (body === null || body === undefined) {
      this.body = null;
    }
    this.body = body;
  }
  send() {
    return network({ method: this.method, url: this.url, body: this.body });
  }
}
