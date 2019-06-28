/*-----------------------------------------------------------------
HANDLE GETTING BACKGROUND IMAGES
-----------------------------------------------------------------*/
window.onload = function() {
  // document.body.style.backgroundImage =
  //   // "url(https://source.unsplash.com/random/1600x900/?nature)";
  //   "url(https://source.unsplash.com/collection/4345819/)";
  loadItems();
};

/*-----------------------------------------------------------------
LOAD ANY EXISTING TODO ITEMS FROM LOCAL STORAGE
-----------------------------------------------------------------*/
const loadItems = () => {
  // localStorage.clear();
  const items = { ...localStorage };
  console.log("localStorage on load:", items);

  const entries = Object.entries(items);

  for (const [timestamp, text] of entries) {
    // const number = parseInt(toDoNumber.slice(4));
    createListItem(text, timestamp);
  }
};

/*-----------------------------------------------------------------
HANDLE FORM SUBMIT
-----------------------------------------------------------------*/
var form = document.getElementById("todo-form");
const handleForm = event => {
  event.preventDefault();
};
form.addEventListener("submit", handleForm);

/*-----------------------------------------------------------------
HANDLE ENTER KEY PRESS
-----------------------------------------------------------------*/
document.body.addEventListener("keyup", function(e) {
  e.preventDefault();
  if (e.keyCode == 13) {
    // Simulate clicking on the submit button.
    addButton.onclick();
  }
});

/*-----------------------------------------------------------------
  HANDLE ADD BUTTON CLICK
  -----------------------------------------------------------------*/
let addButton = document.getElementById("todo-add-button");

addButton.onclick = function() {
  var text = document.getElementById("todo-item").value;
  if (text !== "") {
    // create ToDo item and add to ToDo list
    createListItem(text);
  }
};

/*-----------------------------------------------------------------
HANDLE INSPIROBOT IMAGES
-----------------------------------------------------------------*/

let getInspiredButton = document.getElementById("getInspiredButton");

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
