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
      // console.log(timestamp);
      // console.log(localStorage.removeItem(timestamp));
      localStorage.removeItem(timestamp);
    }
  } else {
    addItemToList(text, timestamp, "toDoList");
    enableEditing();
    enableCheckingOfMarks();
  }

  // reset the text in the input to nothing
  document.getElementById("todo-item").value = "";

  refreshPlaceholderText();
};

/*-----------------------------------------------------------------
HANDLE ADDING delete and edit icons
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
      count--;
      completedCount++;

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
ENABLE EDITING OF ITEMS
-----------------------------------------------------------------*/
// TODO: update local storage!

const enableEditing = () => {
  let itemToEdit = document.getElementById(`editToDo${count}`);
  itemToEdit.onclick = function() {
    let pNodeToReplace = itemToEdit.previousSibling;
    let pNodeToReplaceID = itemToEdit.previousSibling.id;
    let itemCount = pNodeToReplaceID.slice(-1);
    console.log("itemCount", itemCount);
    let editIcon = pNodeToReplace.nextSibling;
    let trashcanIcon = pNodeToReplace.nextSibling.nextSibling;

    let parentNodeLi = pNodeToReplace.parentNode;
    parentNodeLi.innerHTML = "";
    let inputNode = document.createElement("input");
    inputNode.type = "text";
    inputNode.value = pNodeToReplace.innerHTML;
    inputNode.setAttribute("id", `todo-input${count}`);
    inputNode.setAttribute("class", "todo-input");
    parentNodeLi.appendChild(inputNode);

    let saveIcon = document.createElement("i");
    saveIcon.setAttribute("id", `save${count}`);
    saveIcon.setAttribute("class", "material-icons md-48 md-light saveItem");
    saveIcon.appendChild(document.createTextNode("save"));

    parentNodeLi.appendChild(saveIcon);

    inputNode.addEventListener("keyup", function(e) {
      e.preventDefault();
      if (e.keyCode == 13) {
        // Simulate clicking on the submit button.
        let newText = inputNode.value;
        // console.log("new text", newText);
        parentNodeLi.innerHTML = "";

        let p = document.createElement("p");
        p.appendChild(document.createTextNode(newText));
        parentNodeLi.appendChild(p);

        addEditAndDeleteIcons(parentNodeLi, count);
        enableEditing();
      }
    });

    // on enter

    // parentNodeLi.replaceChild(inputNode, pNodeToReplace);
    // parentNodeLi.removeEventListener("mouseover", function(event) {
    //   editIcon.style.display = "block";
    //   trashcanIcon.style.display = "block";
    // });
    // editIcon.style.display = "none";
    // trashcanIcon.style.display = "none";

    // let parentNodeID = pNodeToReplace.parentNode.id;
    // console.log("itemToEdit", itemToEdit);
    // console.log("textToEdit", itemToEdit.previousSibling.innerHTML);
    console.log("pNodeToReplace", pNodeToReplace);
    console.log("parentNodeLi", parentNodeLi);

    // get the list item and it's timestamp ID
    // const completedItem = itemToEdit.previousSibling.innerHTML;
    // const itemToEditID = this.previousSibling.parentNode.id;
    // console.log("itemToEditID", itemToEditID);
  };
};

/*-----------------------------------------------------------------
ENABLE CHECKING OF ITEMS
-----------------------------------------------------------------*/
const enableCheckingOfMarks = () => {
  let checkMark = document.getElementById(`toDo${count}`);
  checkMark.onclick = function() {
    console.log("checkMark", checkMark);
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
