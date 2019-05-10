/*-----------------------------------------------------------------
HANDLE GETTING BACKGROUND IMAGES
-----------------------------------------------------------------*/
window.onload = function() {
  document.body.style.backgroundImage =
    // "url(https://source.unsplash.com/random/1600x900/?nature)";
    "url(https://source.unsplash.com/collection/4345819/)";
  localStorage.clear();
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
    addButton.onclick();
  }
});

/*-----------------------------------------------------------------
HANDLE INSPIROBOT IMAGES
-----------------------------------------------------------------*/

let getInspiredButton = document.getElementById("getInspired");

getInspiredButton.onclick = function() {
  var botFrame = document.getElementById("inspirobotContainer");
  var botImg = document.getElementById("inspirobotImg");

  if (botFrame.style.display !== "block") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // retrieve data from server
        botImg.src = this.responseText;
      }
    };
    // send data to server
    xhttp.open("GET", "https://inspirobot.me/api?generate=true", true);
    xhttp.send();
    botFrame.style.display = "block";
    window.setTimeout(function() {
      getInspiredButton.replaceChild(
        document.createTextNode("get back to work!"),
        getInspiredButton.childNodes[0]
      );
    }, 3000);
  } else {
    botFrame.style.display = "none";
    botImg.src = "";
    getInspiredButton.replaceChild(
      document.createTextNode("need another boost?"),
      getInspiredButton.childNodes[0]
    );
  }
};

// fs.readFile('/file.json', (err, data) => {
//   if (err !== null) {
//     //handle error
//     console.log(err)
//     return
//   }
//   //no errors, process data
//   console.log(data)
// })
