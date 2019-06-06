let xhttp = new XMLHttpRequest();

let listOfWords = [];

function formatResult(result) {
  listOfWords = result.split("\r\n");
  listOfWords.pop();

  console.log(listOfWords);

  for (var i = 0; i < listOfWords.length; i++) {
    var word = document.createElement("p");
    word.innerHTML = i + 1 + ". " + listOfWords[i];

    document.getElementsByClassName("result")[0].appendChild(word);
  }
}

document
  .getElementsByClassName("submit")[0]
  .addEventListener("click", function() {
    var data = document.getElementsByClassName("inputData")[0].value;
    document.getElementsByClassName("inputData")[0].value = "";

    //Remove all children from the result list
    var node = document.getElementsByClassName("result")[0];
    document.getElementsByClassName("result")[0].innerHTML = "";
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    if (/^[a-zA-Z]+$/.test(data)) {
      xhttp.open("POST", "/wordfinder/upload", true);
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send("data=" + data);
    } else {
      document.getElementsByClassName("result")[0].innerHTML =
        "Please Enter Letters Only";
    }
  });

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = xhttp.responseText;
    formatResult(data);
  }
};
