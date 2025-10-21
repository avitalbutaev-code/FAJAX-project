let word = document.getElementById("item-input");
let btnSend = document.getElementById("btn-send");
btnSend.addEventListener("click", () => {
  let request = new Request();
  request.open("POST", "myserver/username/tasks", word.value);
  request.send();
  console.log("Button clicked with word:", word.value);
});
