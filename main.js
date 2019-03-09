// get background image
window.onload = function() {
  document.body.style.backgroundImage =
    // "url(https://source.unsplash.com/random/1600x900/?nature)";
    "url(https://source.unsplash.com/collection/4345819/)";
};

// handle adding of things to do
let addItem = document.getElementById("todo-add-button");

addItem.onclick = function() {
  var text = document.getElementById("todo-item").value; //.value gets input values
  console.log(text);

  var ul = document.getElementById("list");
  var li = document.createElement("li");
  var p = document.createElement("p");
  p.appendChild(document.createTextNode(text));
  li.appendChild(p);

  var deleteButton = document.createElement("i");
  deleteButton.setAttribute("class", "material-icons md-48 md-light");
  deleteButton.appendChild(document.createTextNode("done"));

  li.appendChild(deleteButton);
  ul.appendChild(li);
};

// Listen for the enter key press.
document.body.addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    // Simulate clicking on the submit button.
    addItem.onclick();
  }
});

// handle getting inspired
let getInspired = document.getElementById("getInspired");

getInspired.onclick = function() {
  var botFrame = document.getElementById("inspirobot");
  if (botFrame.style.display !== "block") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // retrieve data from server
        botFrame.src = this.responseText;
      }
    };
    // send data to server
    xhttp.open("GET", "http://inspirobot.me/api?generate=true", true);
    xhttp.send();
    botFrame.style.display = "block";
  } else {
    botFrame.style.display = "none";
    botFrame.src = "";
  }
};
