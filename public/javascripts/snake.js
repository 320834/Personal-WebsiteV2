//This is the client side snake game

//Holds the high score obj in this javascript instance
let highscoreObj;

//Xhttp object
let xhttp = new XMLHttpRequest();
let sendObj = new XMLHttpRequest();

//Game mechanics begin
var stage;
var circle;
var endGame = false;
var block;

var xaxispos = true;
var xaxisneg = false;
var yaxispos = false;
var yaxisneg = false;

var stageDimensions = 500;

var score = 0;
var scoreText;

//Loop body
var loop;
var food;
var lastButton;

//Snake body
var snake = [];

function alertInput() {
  var person = prompt(
    "Congragulations! You got a new high score. Please enter your name to immortalize your achievements on this website"
  );

  if (person === null || person === "") {
    do {
      person = prompt(
        "No I insist. Please enter a name. Or a bunch of letters"
      );
    } while (person === null || person === "");
  }

  sendObj.open("POST", "/snakegame/edit", true);
  sendObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  sendObj.send("name=" + person + "&" + "score=" + score);

  return person;
}

function init() {
  //Code for intializing stage
  console.log("Stage initializing");
  stage = new createjs.Stage("demoCanvas");

  score = 0;
  scoreText = new createjs.Text("Score: " + score, "20px Arial", "#0307F9");
  scoreText.x = 10;
  scoreText.y = 10;
  stage.addChild(scoreText);

  //Initializes the starting snake.
  for (var i = 0; i < 4; i++) {
    block = new createjs.Shape();
    block.graphics.beginFill("#17F903").drawRect(0, 0, 20, 20);

    //Explictly places position
    if (i === 0) {
      block.x = 80;
      block.y = 40;
    } else {
      block.x = 80 - 20 * i;
      block.y = 40;
    }

    stage.addChild(block);
    snake.push(block);

    stage.update();
  }

  //Spawns food
  spawnFood();
}

function changeMove(event) {
  var v = event.which || event.keyCode;

  //console.log("Pressed " + v);

  if (!endGame) {
    //a = 65
    if (v === 65) {
      if (xaxispos === true) {
      } else {
        xaxispos = false;
        xaxisneg = true;
        yaxispos = false;
        yaxisneg = false;
      }

      //clearInterval(loop);
      stage.update();
    }

    //s = 83
    if (v === 83) {
      if (yaxisneg === true) {
      } else {
        xaxispos = false;
        xaxisneg = false;
        yaxispos = true;
        yaxisneg = false;
      }

      //clearInterval(loop);
      stage.update();
    }

    //d = 68
    if (v === 68) {
      //console.log("Stuff\n");
      if (xaxisneg === true) {
        //console.log("Here");
      } else {
        xaxispos = true;
        xaxisneg = false;
        yaxispos = false;
        yaxisneg = false;
      }

      //clearInterval(loop);
      stage.update();
    }

    //w = 87
    if (v === 87) {
      if (yaxispos === true) {
      } else {
        xaxispos = false;
        xaxisneg = false;
        yaxispos = false;
        yaxisneg = true;
      }

      stage.update();
    }

    //The loop code that moves last block in snake to front
    if (lastButton === v) {
    } else {
      clearInterval(loop);
      loopFunction(v);
    }

    lastButton = v;
  }
}

//The main function of the game. Includes a loop that checks
//every 75 milliseconds
function loopFunction(v) {
  if (v === 68 || v === 65 || v === 83 || v === 87) {
    loop = setInterval(function() {
      //2
      if (xaxispos) {
        lastToFront(2);
      }

      //4
      if (xaxisneg) {
        lastToFront(4);
      }

      //1
      if (yaxispos) {
        lastToFront(1);
      }

      //3
      if (yaxisneg) {
        lastToFront(3);
      }

      //Check if game is won
      if (winGame()) {
        clearInterval(loop);
        endGame = true;
        alert("You Win");
        restart();
      }

      //Check if lost conditions are met. If so then it prompts user that they
      //have lost and restarts the game
      if (checkLoseConditions()) {
        alert("You Lost");

        //Check if scores are highscores
        if (checkValidHighscore()) {
          var name = alertInput();

          restart();
        } else {
          restart();
        }
      }

      //Check collsion for food
      if (checkCollision(snake[0], food)) {
        //Add block to end of snake
        addEnd();
        //Remove Food
        removeFood();

        //Spawn and new food
        spawnFood();

        score++;
        scoreText.text = "Score: " + score;
      }

      stage.update();
    }, 80);
  }
}

function lastToFront(move) {
  var last = snake.pop();

  //Move element to front of array.
  snake.unshift(last);

  switch (move) {
    case 1:
      //Up
      snake[0].x = snake[1].x;
      snake[0].y = snake[1].y + 20;
      break;

    //right
    case 2:
      snake[0].x = snake[1].x + 20;
      snake[0].y = snake[1].y;
      break;

    case 3:
      snake[0].x = snake[1].x;
      snake[0].y = snake[1].y - 20;
      break;

    case 4:
      snake[0].x = snake[1].x - 20;
      snake[0].y = snake[1].y;
      break;
  }
}

function checkLoseConditions() {
  //This block checks if the snake is in the dimensions
  if (snake[0].x < 0 || snake[0].x > stageDimensions) {
    clearInterval(loop);
    endGame = true;

    return true;
  } else if (snake[0].y < 0 || snake[0].y > stageDimensions) {
    clearInterval(loop);
    endGame = true;
    return true;
  }

  //Check collsion with snake block
  for (var i = 1; i < snake.length; i++) {
    if (checkCollision(snake[0], snake[i])) {
      clearInterval(loop);
      endGame = true;

      return true;
    }
  }
}

//Restarts the game once player lose
function restart() {
  xaxispos = false;
  xaxisneg = false;
  yaxispos = false;
  yaxisneg = false;

  snake = [];
  init();
  endGame = false;
}

//Checks the collision between two objects.
//@paramter Has to be Shape objects
function checkCollision(block, target) {
  if (block.x === target.x && block.y === target.y) {
    //console.log("Hit Block");
    return true;
  }

  return false;
}

//Add block to end of snake if food has been eaten.
function addEnd() {
  //Check all four sides of last block

  //Get last element
  var last = snake[snake.length - 1];
  var secondLast = snake[snake.length - 2];

  var blockRe;

  if (last.x === secondLast.x && last.y - 20 === secondLast.y) {
    //Add below
    blockRe = new createjs.Shape();
    blockRe.graphics.beginFill("#17F903").drawRect(0, 0, 20, 20);
    stage.addChild(blockRe);

    blockRe.x = last.x;
    blockRe.y = last.y + 20;

    snake.push(blockRe);
    stage.update();
  } else if (last.x === secondLast.x && last.y + 20 === secondLast.y) {
    //Add above
    blockRe = new createjs.Shape();
    blockRe.graphics.beginFill("#17F903").drawRect(0, 0, 20, 20);
    stage.addChild(blockRe);

    blockRe.x = last.x;
    blockRe.y = last.y - 20;

    snake.push(blockRe);
    stage.update();
  } else if (last.x - 20 === secondLast.x && last.y === secondLast.y) {
    //Add right

    blockRe = new createjs.Shape();
    blockRe.graphics.beginFill("#17F903").drawRect(0, 0, 20, 20);
    stage.addChild(blockRe);

    blockRe.x = last.x + 20;
    blockRe.y = last.y;

    snake.push(blockRe);
    stage.update();
  } else if (last.x + 20 === secondLast.x && last.y === secondLast.y) {
    //Add left

    blockRe = new createjs.Shape();
    blockRe.graphics.beginFill("#17F903").drawRect(0, 0, 20, 20);
    stage.addChild(blockRe);

    blockRe.x = last.x - 20;
    blockRe.y = last.y;

    snake.push(blockRe);
    stage.update();
  }
}

//Functions spawn food randomly on the cavnas board
function spawnFood() {
  //This do while loop finds the appropriate food
  var flagX = false;
  var flagY = false;

  //Subtract 40 so that the spawning of food is not on the edge
  var valueX = Math.floor(Math.random() * (stageDimensions - 40));
  var valueY = Math.floor(Math.random() * (stageDimensions - 40));

  if (valueX % 20 !== 0) {
    var r = valueX % 20;
    valueX = valueX - r;
  }

  if (valueY % 20 !== 0) {
    var r = valueY % 20;
    valueY = valueY - r;
  }

  valueX = valueX + 20;
  valueY = valueY + 20;

  for (var i = 0; i < snake.length; i++) {
    if (snake[i].x === valueX) {
      flagX = true;
    }

    if (snake[i].y === valueY) {
      flagY = true;
    }
  }

  if (flagX) {
    valueX = valueX + 20;
  }

  if (flagY) {
    valueY = valueY + 20;
  }

  //Actual spawning of food
  food = new createjs.Shape();
  food.graphics.beginFill("#ff0000").drawRect(0, 0, 20, 20);

  food.x = valueX;
  food.y = valueY;
  stage.addChild(food);
  stage.update();
}

//Function to remove food once snake eats it
function removeFood() {
  stage.removeChild(food);
  stage.update();
}

//Win game condition
//Returns true if snake covers entire board.
function winGame() {
  if (snake.length === (stageDimensions * stageDimensions) / 400) {
    return true;
  }

  return false;
}

function checkValidHighscore() {
  for (var i = 4; i >= 0; i--) {
    if (score > highscoreObj[i].score) {
      return true;
    }
  }
}

function PopulateHighscore() {
  for (var i = 0; i < 5; i++) {
    var nameslot = i + 1 + "a";
    var scoreslot = i + 1 + "b";
    if (highscoreObj[i] != undefined) {
      document.getElementsByClassName(nameslot)[0].innerHTML =
        highscoreObj[i].name;
      document.getElementsByClassName(scoreslot)[0].innerHTML =
        highscoreObj[i].score;
    }
  }
}

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    highscoreObj = JSON.parse(xhttp.responseText);

    //Execute load data
    PopulateHighscore();
  }
};

sendObj.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    highscoreObj = JSON.parse(sendObj.responseText);

    //Execute load data
    PopulateHighscore();
  }
};

xhttp.open("GET", "/snakegame/highscoreData");
xhttp.send();

init();

document.body.addEventListener("keydown", changeMove);

setInterval(function() {
  xhttp.open("GET", "/snakegame/highscoreData");
  xhttp.send();
}, 5000);
