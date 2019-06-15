let count = 1;
let completedCount = 0;

/*-----------------------------------------------------------------
HANDLE SAVING TO LOCAL STORAGE
-----------------------------------------------------------------*/
const saveToLocalStorage = (text, count) => {
  localStorage.setItem(count, text);
};

/*-----------------------------------------------------------------
HANDLE ADDING ITEM TO ANY LIST
-----------------------------------------------------------------*/
const addItemToList = (text, listname, toDoItem) => {
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
    saveToLocalStorage(text, `toDo${count}`);
  } else {
    //track completedCount and give the option for an inspirobot image
    // also track times on items in the completed loacl storage and remove after midnight
    // let getInspiredButton = document.getElementById("getInspired");
    // getInspiredButton.appendChild(
    //   document.createTextNode("psst... need a boost?")
    // );
    // getInspiredButton.style.display = "block";
  }
};

/*-----------------------------------------------------------------
HANDLE CHECKING OF ITEMS
-----------------------------------------------------------------*/
const handleCompletedItems = () => {
  var checkItem = function() {
    let completedSection = document.getElementById("completed");
    completedSection.style.display = "block";

    const completedItem = this.previousSibling.innerHTML;
    const completedItemID = this.id;
    this.parentElement.remove();

    addItemToList(completedItem, "completedList");
    localStorage.removeItem(`toDo${count}`);
    console.log(localStorage);
    completedCount += 1;
    count -= 1;
    // console.log(completedCount, count);
  };
    addItemToList(completedItem, "completedList", false);

    localStorage.removeItem(completedItemID);
  document.getElementById(`toDo${count}`).onclick = checkItem;
};

/*-----------------------------------------------------------------
  HANDLE COUNT
  -----------------------------------------------------------------*/
const refreshPlaceholderText = () => {
  let list = document.getElementById("list");
  var input = document.getElementById("todo-item");
  console.log("count", count);
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
