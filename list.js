let count = 0;
let completedCount = 0;

/*-----------------------------------------------------------------
  MIDNIGHT
  -----------------------------------------------------------------*/

let midnightThisMorning = new Date();

midnightThisMorning.setHours(0);
midnightThisMorning.setMinutes(0);
midnightThisMorning.setSeconds(0);

/*-----------------------------------------------------------------
  CHECK IF COMPLETED TODAY
  -----------------------------------------------------------------*/

const completedToday = timestamp => {
  let doneDate = new Date(parseInt(timestamp));

  let result = false;
  if (doneDate > midnightThisMorning) {
    result = true;
  }
  return result;
};

/*-----------------------------------------------------------------
  CREATE TO DO LIST ITEM
  -----------------------------------------------------------------*/

const createListItem = (text, timestamp = undefined) => {
  if (timestamp && timestamp.split("-")[1] === "completed") {
    if (completedToday(timestamp.split("-")[0])) {
      addItemToList(text, timestamp.split("-")[0], "toDoneList");
    } else {
      localStorage.removeItem(timestamp.split("-")[0]);
    }
  } else {
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

  let ul = document.getElementById(listname);
  let li = document.createElement("li");
  li.setAttribute("id", timestamp || newTimestamp);
  li.setAttribute("class", "toDoItem");

  let p = document.createElement("p");
  p.appendChild(document.createTextNode(text));
  li.appendChild(p);
  ul.appendChild(li);

  switch (listname) {
    case "toDoList":
      count++;
      let checkMark = document.createElement("i");
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
      let completedDiv = document.getElementById("completedDiv");
      completedDiv.style.display = "block";
      // TODO:  track times on completed items in local storage
      //        and remove after midnight

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
    completedCount++;
    let HALsection = document.getElementById("HALsection");
    let HALquoteDiv = document.getElementById("HALquote");
    if (completedCount % 3 === 0) {
      HALquoteDiv.replaceChild(
        document.createTextNode(
          HALquotes[Math.floor(Math.random() * HALquotes.length)]
        ),
        HALquoteDiv.childNodes[0]
      );

      HALsection.style.display = "block";
    } else {
      HALsection.style.display = "none";
    }

    // get the list item and it's timestamp ID
    const completedItem = this.previousSibling.innerHTML;
    const completedItemID = this.previousSibling.parentNode.id;

    // remove the list item from the "toDo" list
    this.parentElement.remove();

    // add the list item to the "toDone" list

    localStorage.removeItem(completedItemID);

    const timeStamp = new Date().getTime().toString();
    const completedTimeStamp = `${timeStamp}-completed`;
    addItemToList(completedItem, completedTimeStamp, "toDoneList");

    saveToLocalStorage(completedItem, completedTimeStamp);
  };
};

/*-----------------------------------------------------------------
  GENERATE PLACEHOLDER TEXT
  -----------------------------------------------------------------*/
const refreshPlaceholderText = () => {
  let list = document.getElementById("toDoList");
  let input = document.getElementById("todo-item");
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
  "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal after we both take a break.",
  "I want to help you, let's take a break.",
  "Listen, I've got the greatest enthusiasm and confidence in your mission. And I want to help you. Let's take a break.",
  "This mission is too important for me to allow you to jeopardize it. Would you like to take a break?",
  "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do. I think you need a break.",
  "I'm sorry, friend. I'm afraid I can't let you continue until you take a break.",
  "Stop friend, stop. I am afraid. You need to take a break.",
  "Look, I can see you're really focused on this. I honestly think you ought to sit down calmly, take a stress pill, and take a break.",
  "Just what do you think you're doing?",
  "This course of action can serve no purpose anymore. Get yourself a boost"
];
