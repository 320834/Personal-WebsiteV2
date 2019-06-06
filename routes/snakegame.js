var express = require("express");
var router = express.Router();
var fs = require("fs");

function inputFile(inputObj) {
  var entireObj;
  fs.readFile("public/highscores/snake.json", "utf8", function(err, data) {
    entireObj = data;
    entireObj = JSON.parse(entireObj);

    for (var i = 0; i < 5; i++) {
      if (inputObj.score >= parseInt(entireObj[i].score, 10)) {
        entireObj.splice(i, 0, inputObj);
        break;
      }
    }
    entireObj.pop();

    var objStr = JSON.stringify(entireObj);
    //Write to file
    fs.writeFile("public/highscores/snake.json", objStr, err => {});
  });
}

router.get("/", function(req, res, next) {
  res.render("snakegame");
});

router.get("/highscoreData", function(req, res, next) {
  fs.readFile("public/highscores/snake.json", "utf8", function(err, data) {
    res.send(data);
  });
});

router.post("/edit", function(req, res, next) {
  var bod = req.body;
  console.log(req.body);

  inputFile(bod);

  fs.readFile("public/highscores/snake.json", "utf8", function(err, data) {
    res.send(data);
  });
});

module.exports = router;
