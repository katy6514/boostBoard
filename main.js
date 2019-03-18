/*-----------------------------------------------------------------
HANDLE GETTING BACKGROUND IMAGES
-----------------------------------------------------------------*/
window.onload = function() {
  document.body.style.backgroundImage =
    // "url(https://source.unsplash.com/random/1600x900/?nature)";
    "url(https://source.unsplash.com/collection/4345819/)";
};

/*-----------------------------------------------------------------
HANDLE FORM SUBMIT
-----------------------------------------------------------------*/
var form = document.getElementById("todo-form");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

/*-----------------------------------------------------------------
handle enter key press
-----------------------------------------------------------------*/
document.body.addEventListener("keyup", function(e) {
  e.preventDefault();
  if (e.keyCode == 13) {
    // Simulate clicking on the submit button.
    addItem.onclick();
  }
});

/*-----------------------------------------------------------------
HANDLE INSPIROBOT IMAGES
-----------------------------------------------------------------*/

let getInspiredButton = document.getElementById("getInspired");

getInspiredButton.onclick = function() {
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
    getInspiredButton.replaceChild(
      document.createTextNode("get back to work!"),
      getInspiredButton.childNodes[0]
    );
  } else {
    botFrame.style.display = "none";
    botFrame.src = "";
    getInspiredButton.replaceChild(
      document.createTextNode("psst... need another boost?"),
      getInspiredButton.childNodes[0]
    );
  }
};
