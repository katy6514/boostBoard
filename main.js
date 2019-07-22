/*-----------------------------------------------------------------
HANDLE GETTING BACKGROUND IMAGES
-----------------------------------------------------------------*/
window.onload = function() {
  // 151521
  // 17098
  // 175083
  // 573009
  // 1368747
  // 4345819
  let unsplashCollection = 4345819;
  if (localStorage.unsplash) {
    unsplashCollection = localStorage.unsplash;
  }
  document.body.style.backgroundImage = `url(https://source.unsplash.com/collection/${unsplashCollection}/)`;
  loadItems();
};

/*-----------------------------------------------------------------
SORT BY TIMESTAMP
-----------------------------------------------------------------*/

function sortByTimestamp(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}

/*-----------------------------------------------------------------
LOAD ANY EXISTING TODO ITEMS FROM LOCAL STORAGE
-----------------------------------------------------------------*/
const loadItems = () => {
  // localStorage.clear();
  const items = { ...localStorage };
  console.log(items);

  const entries = Object.entries(items);

  filteredEntries = entries.filter(entry => entry[0] !== "unsplash");

  sortedEntries = filteredEntries.sort(sortByTimestamp);

  for (const [timestamp, text] of sortedEntries) {
    // console.log(timestamp, text);
    createListItem(text, timestamp);
  }
};

/*-----------------------------------------------------------------
HANDLE FORM SUBMIT
-----------------------------------------------------------------*/
let form = document.getElementById("todo-form");
const handleForm = event => {
  event.preventDefault();
};
form.addEventListener("submit", handleForm);

/*-----------------------------------------------------------------
HANDLE WRAPPER DIV ENTER KEY PRESS
-----------------------------------------------------------------*/
document.getElementById("todo-item").addEventListener("keyup", function(e) {
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
  let text = document.getElementById("todo-item").value;
  if (text !== "") {
    // create ToDo item and add to ToDo list

    createListItem(text);
  }
};

/*-----------------------------------------------------------------
SAVE USER'S UNSPLASH COLLECTION
-----------------------------------------------------------------*/
var unsplashInput = document.getElementById("unsplashInput");

unsplashInput.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 10 || event.keyCode === 13) {
    // Simulate clicking on the submit button.
    // console.log("unsplashInput", unsplashInput);
    localStorage.unsplash = unsplashInput.value;
    location.reload();
  }
});

/*-----------------------------------------------------------------
HANDLE INSPIROBOT IMAGES
-----------------------------------------------------------------*/

let getInspiredButton = document.getElementById("getInspiredButton");

// use the fetch request object instead of XMLRequest: https://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c

getInspiredButton.onclick = function() {
  let botFrame = document.getElementById("inspirobotContainer");
  let botImg = document.getElementById("inspirobotImg");
  let HALsection = document.getElementById("HALsection");

  let xhttp = new XMLHttpRequest();
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
  getInspiredButton.style.display = "none";

  window.setTimeout(function() {
    HALsection.style.display = "none";
    botFrame.style.display = "none";
    botImg.src = "";
  }, 30000);
};
