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
    checkButton.setAttribute("id", count);
    checkButton.setAttribute("cursor", "pointer");
    checkButton.setAttribute(
      "class",
      "material-icons md-48 md-light checkItem"
    );
    checkButton.appendChild(document.createTextNode("done"));
    li.appendChild(checkButton);
  }
}

/*-----------------------------------------------------------------
HANDLE CHECKABLES
-----------------------------------------------------------------*/
function handleCompletedItems(count) {
  var completedCount = 0;
  var checkItem = function() {
    let completedSection = document.getElementById("completed");
    completedSection.style.display = "block";

    var completedItem = this.previousSibling.innerHTML;
    console.log(completedItem);
    this.setAttribute("class", "completedItem");
    this.previousSibling.setAttribute("class", "completedItem");

    addItemToList(completedItem, "completedList");
    completedCount++;
    console.log(completedCount);
  };

  document.getElementById(count).onclick = checkItem;
}

/*-----------------------------------------------------------------
  HANDLE COUNT
  -----------------------------------------------------------------*/
function refreshPlaceholderText(count) {
  let list = document.getElementById("list");
  var input = document.getElementById("todo-item");
  let getInspiredButton = document.getElementById("getInspired");

  if (count <= 1) {
    list.style.display = "block";
    input.setAttribute("placeholder", "Do this other thing...");
  } else if (count <= 2) {
    input.setAttribute("placeholder", "And do one more thing...");
  } else if (count <= 3) {
    getInspiredButton.appendChild(
      document.createTextNode("psst... need a boost?")
    );
    getInspiredButton.style.display = "block";
    input.setAttribute("placeholder", "Just kidding one more thing...");
  }
}

/*-----------------------------------------------------------------
  HANDLE TO DO LIST
  -----------------------------------------------------------------*/
let addButton = document.getElementById("todo-add-button");

let count = 0;

addButton.onclick = function() {
  var text = document.getElementById("todo-item").value;
  if (text !== "") {
    // create ToDo item and add to ToDo list

    addItemToList(text, "list", true);

    // reset the text in the input to nothing
    document.getElementById("todo-item").value = "";

    refreshPlaceholderText(count);

    handleCompletedItems(count);
    count++;
  }
};
