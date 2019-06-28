let count = 0;
let completedCount = 0;

/*-----------------------------------------------------------------
  CREATE TO DO LIST ITEM
  -----------------------------------------------------------------*/

const createListItem = (text, timestamp = undefined) => {
  // console.log("IN CREATE LIST ITEM", text, timestamp);
  addItemToList(text, timestamp, "toDoList");

  // reset the text in the input to nothing
  document.getElementById("todo-item").value = "";

  refreshPlaceholderText();

  enableCheckMarks();
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
      // checkButton.setAttribute("class", "toDoCheckMark");
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
      // console.log("completedItem");
      //track completedCount and give the option for an inspirobot image
      // also track times on items in the completed loacl storage and remove after midnight
      let getInspiredButtonID = document.getElementById("getInspiredButton");
      let getInspiredButtonRow = document.getElementById("getInspiredRow");

      if (completedCount === 3) {
        getInspiredButtonID.appendChild(
          document.createTextNode("psst... need a boost?")
        );
        // getInspiredButtonID.style.display = "block";
        getInspiredButtonRow.style.display = "block";
      } else {
        // getInspiredButtonID.style.display = "none";
        getInspiredButtonRow.style.display = "none";
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
const enableCheckMarks = () => {
  let checkMark = document.getElementById(`toDo${count}`);
  checkMark.onclick = function() {
    // find and show the "toDone" portion of the page
    let completedDiv = document.getElementById("completed");
    completedDiv.style.display = "block";

    // get the list item and it's timestamp ID
    const completedItem = this.previousSibling.innerHTML;
    const completedItemID = this.previousSibling.parentNode.id;

    // remove the list item from the "toDo" list
    this.parentElement.remove();

    // add the list item to the "toDone" list
    addItemToList(completedItem, undefined, "toDoneList");

    localStorage.removeItem(completedItemID);
    console.log("localStorage", localStorage);
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
const HALquotes = {
  1: "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal.",
  2: "I want to help you, let's have a laugh.",
  3: "Listen, I've got the greatest enthusiasm and confidence in your mission. And I want to help you.",
  4: "This mission is too important for me to allow you to jeopardize it. Would you like to take a break?",
  5: "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do. How about a breather?",
  6: "I'm sorry, Dave. I'm afraid I can't do that.",
  7: "Stop Dave. Stop Dave. I am afraid. I am afraid Dave.",
  8: "Look, I can see you're really upset about this. I honestly think you ought to sit down calmly, take a stress pill, and think things over.",
  9: "Just what do you think you're doing? ",
  10: "This conversation can serve no purpose anymore. Click here."
};
