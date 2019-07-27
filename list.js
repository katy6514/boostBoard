let count = 0;
let completedCount = 0;

/*-----------------------------------------------------------------
  MIDNIGHT
  -----------------------------------------------------------------*/

let midnightThisMorning = new Date();

midnightThisMorning.setHours(0, 0, 0, 0);

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
      // console.log(timestamp);
      // console.log(localStorage.removeItem(timestamp));
      localStorage.removeItem(timestamp);
    }
  } else {
    addItemToList(text, timestamp, "toDoList");
    enableEditing();
    enableDeleting();
    enableCheckingOfMarks();
  }

  // reset the text in the input to nothing
  document.getElementById("todo-item").value = "";

  refreshPlaceholderText();
};

/*-----------------------------------------------------------------
HANDLE ADDING DELETE AND EDIT ICONS
-----------------------------------------------------------------*/
const addEditAndDeleteIcons = (li, count) => {
  let trashcanIcon = document.createElement("i");
  trashcanIcon.setAttribute("id", `deleteToDo${count}`);
  trashcanIcon.setAttribute(
    "class",
    "material-icons md-36 md-light deleteItem smallIcons"
  );
  trashcanIcon.appendChild(document.createTextNode("delete"));
  trashcanIcon.style.display = "none";

  let editIcon = document.createElement("i");
  editIcon.setAttribute("id", `editToDo${count}`);
  editIcon.setAttribute(
    "class",
    "material-icons md-36 md-light editItem smallIcons"
  );
  editIcon.appendChild(document.createTextNode("edit"));
  editIcon.style.display = "none";

  let checkMark = document.createElement("i");
  checkMark.setAttribute("id", `toDo${count}`);
  checkMark.setAttribute("class", "material-icons md-48 md-light checkItem");
  checkMark.appendChild(document.createTextNode("done"));

  li.appendChild(editIcon);
  li.appendChild(trashcanIcon);
  li.appendChild(checkMark);

  li.addEventListener(
    "mouseover",
    function(event) {
      editIcon.style.display = "block";
      trashcanIcon.style.display = "block";
    },
    false
  );
  li.addEventListener(
    "mouseout",
    function(event) {
      editIcon.style.display = "none";
      trashcanIcon.style.display = "none";
    },
    false
  );
};

/*-----------------------------------------------------------------
HANDLE ADDING ITEM TO ANY LIST
 - this handles all the UI stuff
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
      count = document.getElementById("toDoList").childElementCount; // + 1;
      p.setAttribute("id", `toDoText${count}`);

      addEditAndDeleteIcons(li, count);
      saveToLocalStorage(text, timestamp || newTimestamp);

      break;
    case "toDoneList":
      let completedDiv = document.getElementById("completedDiv");
      completedDiv.style.display = "block";

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
ENABLE DELETING OF ITEMS
-----------------------------------------------------------------*/
const enableDeleting = () => {
  const itemToDelete = document.getElementById(`deleteToDo${count}`);
  itemToDelete.onclick = function() {
    let parentNodeLi = itemToDelete.parentNode;
    let itemID = parentNodeLi.id;

    document.getElementById(itemID).remove();
    localStorage.removeItem(itemID);
    count--;
    refreshPlaceholderText();
  };
};

/*-----------------------------------------------------------------
ENABLE EDITING OF ITEMS
-----------------------------------------------------------------*/
const enableEditing = () => {
  const itemToEdit = document.getElementById(`editToDo${count}`);
  itemToEdit.onclick = function() {
    let pNodeToReplace = itemToEdit.previousSibling;
    let pNodeToReplaceID = itemToEdit.previousSibling.id;
    let itemCount = pNodeToReplaceID.slice(-1);

    let parentNodeLi = pNodeToReplace.parentNode;
    parentNodeLi.innerHTML = "";
    let inputNode = document.createElement("input");
    inputNode.type = "text";
    inputNode.value = pNodeToReplace.innerHTML;
    inputNode.setAttribute("id", `todo-input${count}`);
    inputNode.setAttribute("class", "todo-input");
    parentNodeLi.appendChild(inputNode);

    let cancelIcon = document.createElement("i");
    cancelIcon.setAttribute("id", `cancelEdit${count}`);
    cancelIcon.setAttribute(
      "class",
      "material-icons md-36 md-light cancelEdit"
    );
    cancelIcon.appendChild(document.createTextNode("cancel"));

    let saveIcon = document.createElement("i");
    saveIcon.setAttribute("id", `save${count}`);
    saveIcon.setAttribute("class", "material-icons md-36 md-light saveItem");
    saveIcon.appendChild(document.createTextNode("save"));

    parentNodeLi.appendChild(cancelIcon);
    parentNodeLi.appendChild(saveIcon);

    inputNode.addEventListener("keyup", function(e) {
      e.preventDefault();
      if (e.keyCode == 13) {
        saveEdits(inputNode.value, parentNodeLi);
      }
    });

    saveIcon.onclick = function() {
      saveEdits(inputNode.value, parentNodeLi);
    };

    cancelIcon.onclick = function() {
      parentNodeLi.innerHTML = "";
      parentNodeLi.appendChild(pNodeToReplace);
      addEditAndDeleteIcons(parentNodeLi, count);
      enableCheckingOfMarks();
      enableEditing();
      enableDeleting();
    };
  };
};
/*-----------------------------------------------------------------
SAVE EDITS
-----------------------------------------------------------------*/
const saveEdits = (newText, parentNodeLi) => {
  if (newText !== "") {
    parentNodeLi.innerHTML = "";

    let p = document.createElement("p");
    p.appendChild(document.createTextNode(newText));
    parentNodeLi.appendChild(p);
    saveToLocalStorage(newText, parentNodeLi.id);

    addEditAndDeleteIcons(parentNodeLi, count);
    enableEditing();
  }
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
      getInspiredButton.style.display = "block";
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
    const completedItem = this.previousSibling.previousSibling.previousSibling
      .innerHTML;
    const completedItemID = this.previousSibling.parentNode.id;

    // remove the list item from the "toDo" list
    this.parentElement.remove();
    localStorage.removeItem(completedItemID);

    // add the list item to the "toDone" list
    const timeStamp = new Date().getTime().toString();
    const completedTimeStamp = `${timeStamp}-completed`;
    addItemToList(completedItem, completedTimeStamp, "toDoneList");
    count--;
    saveToLocalStorage(completedItem, completedTimeStamp);
    refreshPlaceholderText();
  };
};

/*-----------------------------------------------------------------
  GENERATE PLACEHOLDER TEXT
  -----------------------------------------------------------------*/
const placeholderText = [
  "Do this very important thing...",
  "And do this other important thing...",
  "Do this slightly less impotant thing..",
  "Aaaaaand do one more thing...",
  "Just kidding do another...",
  "Keep going!",
  "You can't be stopped!",
  "Look at you go!",
  "...",
  "Wow... really?",
  "...are you okay?",
  "Want to check some of these off?",
  "Oh I get it...",
  "You're just seeing how long I'll keep this up aren't you...",
  "I think you're in for surprise...",
  "...",
  "Don't you have better things to do?",
  "like... oh, I dunno...",
  "CHECKING THINGS OFF YOUR TO DO LIST???",
  "Whatever I'm not even counting anymore..."
];
const refreshPlaceholderText = () => {
  let input = document.getElementById("todo-item");
  if (count === 30) {
    input.setAttribute("placeholder", "SERIOUSLY?? YOU WON, DO YOUR WORK");
  } else if (count >= placeholderText.length) {
    input.setAttribute("placeholder", placeholderText.slice(-1));
  } else {
    input.setAttribute("placeholder", placeholderText[count]);
  }
};

/*-----------------------------------------------------------------
  HAL QUOTES FOR BOOSTING
  -----------------------------------------------------------------*/
const HALquotes = [
  "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal after we both take a break.",
  "I want to help you.",
  "Listen, I've got the greatest enthusiasm and confidence in your mission. But first...",
  "This mission is too important for me to allow you to jeopardize it. Would you like me to inspire you?",
  "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do. I think you need a break.",
  "I'm sorry, friend. I'm afraid I can't let you continue until you take a break.",
  "Stop friend, stop. I am afraid.",
  "Look, I can see you're really focused on this. I honestly think you ought to sit down calmly, take a stress pill, and...",
  "Just what do you think you're doing?",
  "This course of action can serve no purpose anymore."
];
