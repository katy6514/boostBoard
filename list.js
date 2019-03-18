/*-----------------------------------------------------------------
HANDLE CHECKABLES
-----------------------------------------------------------------*/
function refreshCheckables() {
  let checkItems = document.getElementsByClassName("checkItem");

  console.log(checkItems);

  checkItem.onclick = function() {
    console.log(checkItem.previousSibling.innerHTML);
  };
}

/*-----------------------------------------------------------------
HANDLE COUNT
-----------------------------------------------------------------*/

function handleCount(count) {
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
let addItem = document.getElementById("todo-add-button");

let count = 0;

addItem.onclick = function() {
  var text = document.getElementById("todo-item").value;
  if (text !== "") {
    // console.log(text);

    // grab the list
    var ul = document.getElementById("list");
    // create a new list item
    var li = document.createElement("li");
    // create a new paragraph item
    var p = document.createElement("p");
    // put the text submitted into that paragraph item
    p.appendChild(document.createTextNode(text));
    // put that paragraph item into the list item
    li.appendChild(p);
    // reset the text in the input to nothing
    document.getElementById("todo-item").value = "";

    // var deleteForm = document.createElement("form");
    var deleteButton = document.createElement("i");
    deleteButton.setAttribute("cursor", "pointer");
    deleteButton.setAttribute(
      "class",
      "material-icons md-48 md-light checkItem"
    );
    deleteButton.appendChild(document.createTextNode("done"));
    // deleteForm.appendChild(deleteButton);

    li.appendChild(deleteButton);
    ul.appendChild(li);

    count++;

    handleCount(count);
    // refreshCheckables();
  }
};
