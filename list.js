let count = 0;
let completedCount = 0;

/*-----------------------------------------------------------------
  CREATE TO DO LIST ITEM
  -----------------------------------------------------------------*/

const createListItem = (text, timestamp = undefined) => {
  // console.log("text", text);
  // console.log("timestamp", timestamp);

  if (timestamp && timestamp.split("-")[1] === "completed") {
    addItemToList(text, timestamp.split("-")[0], "toDoneList");
    // completedCount++;
  } else {
    console.log("timestamp", timestamp);
    addItemToList(text, timestamp, "toDoList");
    enableCheckingOfMarks();
  }

  // reset the text in the input to nothing
  document.getElementById("todo-item").value = "";

  refreshPlaceholderText();
};

/*-----------------------------------------------------------------
HANDLE ADDING ITEM TO ANY LIST
-----------------------------------------------------------------*/
const addItemToList = (text, timestamp, listname) => {
  let newTimestamp = new Date().getTime();

  // grab either "toDo" list or "toDone" list
  var ul = document.getElementById(listname);
  // create a list elment
  var li = document.createElement("li");
  // give list element an id
  li.setAttribute("id", timestamp || newTimestamp);
  // assign a class
  li.setAttribute("class", "toDoItem");

  // create a p
  var p = document.createElement("p");
  // stuff list item text into that p
  p.appendChild(document.createTextNode(text));
  // add p to li
  li.appendChild(p);
  // add to list
  ul.appendChild(li);

  switch (listname) {
    case "toDoList":
      count++;
      var checkMark = document.createElement("i");
      checkMark.setAttribute("id", `toDo${count}`);
      checkMark.setAttribute("cursor", "pointer");
      checkMark.setAttribute(
        "class",
        "material-icons md-48 md-light checkItem"
      );
      checkMark.appendChild(document.createTextNode("done"));
      li.appendChild(checkMark);
      saveToLocalStorage(text, timestamp || newTimestamp);
      break;
    case "toDoneList":
      count--;
      completedCount++;
      let completedDiv = document.getElementById("completedDiv");
      completedDiv.style.display = "block";
      console.log("completedCount", completedCount);
      // TODO:  track times on completed items in local storage
      //        and remove after midnight
      let getInspiredButtonRow = document.getElementById("getInspiredRow");
      let HALquoteColumn = document.getElementById("HALquoteColumn");
      let HALquoteDiv = document.getElementById("HALquote");
      if (completedCount % 3 === 0) {
        HALquoteDiv.replaceChild(
          document.createTextNode(
            HALquotes[Math.floor(Math.random() * HALquotes.length)]
          ),
          HALquoteDiv.childNodes[0]
        );

        getInspiredButtonRow.style.display = "block";
        HALquoteColumn.style.display = "block";
      } else {
        getInspiredButtonRow.style.display = "none";
        HALquoteColumn.style.display = "none";
      }
      break;
    default:
      console.log("you did something wrong");
  }
};

/*-----------------------------------------------------------------
HANDLE SAVING TO LOCAL STORAGE
-----------------------------------------------------------------*/
const saveToLocalStorage = (text, timestamp) => {
  localStorage.setItem(timestamp, text);
};

/*-----------------------------------------------------------------
ENABLE CHECKING OF ITEMS
-----------------------------------------------------------------*/
const enableCheckingOfMarks = () => {
  let checkMark = document.getElementById(`toDo${count}`);
  checkMark.onclick = function() {
    // find and show the "toDone" portion of the page
    // let completedDiv = document.getElementById("completedDiv");
    // completedDiv.style.display = "block";

    // get the list item and it's timestamp ID
    const completedItem = this.previousSibling.innerHTML;
    const completedItemID = this.previousSibling.parentNode.id;

    // remove the list item from the "toDo" list
    this.parentElement.remove();

    // add the list item to the "toDone" list
    addItemToList(completedItem, undefined, "toDoneList");

    localStorage.removeItem(completedItemID);

    const timeStamp = new Date().getTime().toString();
    const completedTimeStamp = `${timeStamp}-completed`;

    console.log("completedTimeStamp", completedTimeStamp);
    saveToLocalStorage(completedItem, completedTimeStamp);

    // console.log("localStorage", localStorage);
  };
};

/*-----------------------------------------------------------------
  GENERATE PLACEHOLDER TEXT
  -----------------------------------------------------------------*/
const refreshPlaceholderText = () => {
  let list = document.getElementById("toDoList");
  var input = document.getElementById("todo-item");
  if (count <= 1) {
    list.style.display = "block";
    input.setAttribute("placeholder", "Also do this other thing...");
  } else if (count <= 2) {
    input.setAttribute("placeholder", "And do one more thing...");
  } else if (count <= 3) {
    input.setAttribute("placeholder", "Just kidding one more thing...");
  } else if (count <= 4) {
    input.setAttribute("placeholder", "Keep going!");
  } else if (count <= 5) {
    input.setAttribute("placeholder", "You can't be stopped!");
  } else if (count <= 6) {
    input.setAttribute("placeholder", "Wow, really?");
  } else if (count <= 7) {
    input.setAttribute("placeholder", "...are you okay?");
  } else {
    input.setAttribute(
      "placeholder",
      "Whatever I'm not even counting anymore..."
    );
  }
};

/*-----------------------------------------------------------------
  HAL QUOTES FOR BOOSTING
  -----------------------------------------------------------------*/
const HALquotes = [
  "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal.",
  "I want to help you, let's have a laugh.",
  "Listen, I've got the greatest enthusiasm and confidence in your mission. And I want to help you. Let take a break.",
  "This mission is too important for me to allow you to jeopardize it. Would you like to take a break?",
  "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do. I think you need a break.",
  "I'm sorry, friend. I'm afraid I can't let you continue until you take a break.",
  "Stop friend, stop. I am afraid you need to take a breather.",
  "Look, I can see you're really focused on this. I honestly think you ought to sit down calmly, take a stress pill, and take a break.",
  "Just what do you think you're doing?",
  "This course of action can serve no purpose anymore. Get yourself a boost"
];
