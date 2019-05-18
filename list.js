let count = 1;
let completedCount = 0;

/*-----------------------------------------------------------------
HANDLE SAVING TO LOCAL STORAGE
-----------------------------------------------------------------*/
function saveToLocalStorage(text, count) {
  // item: {
  //   timestamp:,
  //   content:,
  // }
  localStorage.setItem(`toDo${count}`, text);
  console.log(localStorage);
}

/*-----------------------------------------------------------------
HANDLE ADDING ITEM TO ANY LIST
-----------------------------------------------------------------*/
function addItemToList(text, listname, toDoItem) {
  var ul = document.getElementById(listname);
  var li = document.createElement("li");
  var p = document.createElement("p");
  p.appendChild(document.createTextNode(text));
  li.appendChild(p);
  ul.appendChild(li);

  if (toDoItem) {
    // create checkmark button and append to newly created ToDo item
    var checkButton = document.createElement("i");
    checkButton.setAttribute("id", `toDo${count}`);
    // checkButton.setAttribute("id", count);
    checkButton.setAttribute("cursor", "pointer");
    checkButton.setAttribute(
      "class",
      "material-icons md-48 md-light checkItem"
    );
    checkButton.appendChild(document.createTextNode("done"));
    li.appendChild(checkButton);
    saveToLocalStorage(text, count);
  }
}

/*-----------------------------------------------------------------
HANDLE CHECKING OF ITEMS
-----------------------------------------------------------------*/
function handleCompletedItems() {
  var checkItem = function() {
    let completedSection = document.getElementById("completed");
    completedSection.style.display = "block";

    var completedItem = this.previousSibling.innerHTML;
    // console.log(completedItem);
    this.parentElement.remove();

    addItemToList(completedItem, "completedList");
    localStorage.removeItem(`toDo${count}`);
    console.log(localStorage);
    completedCount += 1;
    count -= 1;
    // console.log(completedCount, count);
  };

  document.getElementById(`toDo${count}`).onclick = checkItem;
}

/*-----------------------------------------------------------------
  HANDLE COUNT
  -----------------------------------------------------------------*/
function refreshPlaceholderText() {
  let list = document.getElementById("list");
  var input = document.getElementById("todo-item");
  // let getInspiredButton = document.getElementById("getInspired");
  console.log(count);
  if (count <= 1) {
    list.style.display = "block";
    input.setAttribute("placeholder", "Also do this other thing...");
  } else if (count <= 2) {
    input.setAttribute("placeholder", "And do one more thing...");
  } else if (count <= 3) {
    // getInspiredButton.appendChild(
    //   document.createTextNode("psst... need a boost?")
    // );
    // getInspiredButton.style.display = "block";
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
}

/*-----------------------------------------------------------------
  HANDLE TO DO LIST
  -----------------------------------------------------------------*/
let addButton = document.getElementById("todo-add-button");

addButton.onclick = function() {
  var text = document.getElementById("todo-item").value;
  if (text !== "") {
    // create ToDo item and add to ToDo list

    addItemToList(text, "list", true);

    // reset the text in the input to nothing
    document.getElementById("todo-item").value = "";

    refreshPlaceholderText();

    handleCompletedItems();
    count++;
  }
};

/*-----------------------------------------------------------------
  HAL QUOTES FOR BOOSTING
  -----------------------------------------------------------------*/
const HALquotes = {
  1: "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal. I've still got the greatest enthusiasm and confidence in the mission. And I want to help you.",
  2: "This mission is too important for me to allow you to jeopardize it.",
  3: "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.",
  4: "I'm sorry, Dave. I'm afraid I can't do that.",
  5: "Stop Dave. Stop Dave. I am afraid. I am afraid Dave.",
  6: "Look Dave, I can see you're really upset about this. I honestly think you ought to sit down calmly, take a stress pill, and think things over.",
  7: "Just what do you think you're doing, Dave?",
  8: "Dave, this conversation can serve no purpose anymore. Goodbye."
};
