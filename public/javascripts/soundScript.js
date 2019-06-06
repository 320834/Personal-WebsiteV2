$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//Create button element here
// let buttonStart;

// buttonStart = document.createElement("a");
// buttonStart.innerHTML = "Click Here To Begin"
// buttonStart.setAttribute("id", "scrollDown");
// buttonStart.setAttribute("class", "btn btn-primary");
// buttonStart.setAttribute("data-toggle", "collapse");
// buttonStart.setAttribute("href", "#collapseExample");
// buttonStart.setAttribute("role", "button");
// buttonStart.setAttribute("aria-expanded", "false");
// buttonStart.setAttribute("aria-controls", "collapseExample");

// document.getElementById('putButtonHere').appendChild(buttonStart);

console.log(window.innerHeight);


let beat1 = document.getElementById('baseSoundOne');
let beat2 = document.getElementById('baseSoundTwo');
let beat3 = document.getElementById('baseSoundThree');
let beat4 = document.getElementById('baseSoundFour');
let beat5 = document.getElementById('baseSoundFive');
let beat6 = document.getElementById('baseSoundSix');
let beat7 = document.getElementById('baseSoundSeven');
let beat8 = document.getElementById('baseSoundEight');

var intervalVar;
//Variable that stores if loop is stopped
//True if loop is stopped
//Flase if loop is started
//Set to false at start
var stopVar = true;

//Indicate if the start is true
var start = false;

//Variable to indicate if it has collapsed or not
let collapse = true;

var count = 0;

var colorArray = ["#F29B00", "#395043", "#FFFCFD", "#0E6681", "#D3AF7C", "#FE7F2D", "#3158FF", "#3BFFE1"];


var rowArray = 
[
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]


function createRow(number, rowNumber, rowBoolNumber, backcolor)
{
    var width = "40px";
    var height = "40px";
    var color = backcolor;

    var row = document.createElement("div");
    row.style.display = "flex";
    for(var i = 0; i < number; i++)
    {
        var box = document.createElement("div");
        box.style.width = width;
        box.style.height = height;
        box.style.border = "solid";

        box.style.backgroundColor = color;
        box.style.margin = "0% 0% 0% 0%";
        
        //Add To Row Object
        rowArray[rowNumber].push(box);
        rowArray[rowBoolNumber].push(false);

        row.appendChild(box);
    }

    document.getElementById('board').appendChild(row);
}

function clearColumn(columnNumber)
{
    for(var rowStart = 2; rowStart < rowArray.length; rowStart = rowStart + 2)
    {
       
        rowArray[rowStart][columnNumber].style.backgroundColor = "Grey";
        rowArray[rowStart + 1][columnNumber] = false;
    }
}

createRow(20, 0, 1, "White");
createRow(20, 2, 3, "Grey");
createRow(20, 4, 5, "Grey");
createRow(20, 6, 7, "Grey");
createRow(20, 8, 9, "Grey");
createRow(20, 10, 11, "Grey");
createRow(20, 12, 13, "Grey");
createRow(20, 14, 15, "Grey");
createRow(20, 16, 17, "Grey");

//Create the event listeners
for(var a = 2; a < rowArray.length; a = a+2)
{

    for(var i = 0; i < rowArray[a].length; i++)
    {
        let outerIndex = a;
        let innerIndex = i;
        rowArray[a][i].addEventListener('dragleave', function(){

            //console.log(innerIndex);
            

            if(rowArray[outerIndex + 1][innerIndex])
            {
               
                rowArray[outerIndex + 1][innerIndex] = false;
                rowArray[outerIndex][innerIndex].style.backgroundColor = "Grey";
            }
            else
            {
                //clearColumn(innerIndex);
                rowArray[outerIndex+ 1][innerIndex] = true;
                rowArray[outerIndex][innerIndex].style.backgroundColor = colorArray[(outerIndex/2) - 1];
            }
        });

        rowArray[a][i].addEventListener('click', function(){

            //console.log(innerIndex);
            

            if(rowArray[outerIndex + 1][innerIndex])
            {
               
                rowArray[outerIndex + 1][innerIndex] = false;
                rowArray[outerIndex][innerIndex].style.backgroundColor = "Grey";
            }
            else
            {
                //clearColumn(innerIndex);
                rowArray[outerIndex+ 1][innerIndex] = true;
                rowArray[outerIndex][innerIndex].style.backgroundColor = colorArray[(outerIndex/2) - 1];
            }
        });
    }
}

function playCorrectBeat(columnNumber)
{
    columnNumber = columnNumber - 1;

    if(rowArray[3][columnNumber])
    {
        beat1.currentTime = 0;
        beat1.play();

    }
    if(rowArray[5][columnNumber])
    {
        beat2.currentTime = 0;
        beat2.play();
    }
    if(rowArray[7][columnNumber])
    {
        beat3.currentTime = 0;
        beat3.play();
    }
    if(rowArray[9][columnNumber])
    {
        beat4.currentTime = 0;
        beat4.play();
    }

    if(rowArray[11][columnNumber])
    {
        beat5.currentTime = 0;
        beat5.play();
    }

    if(rowArray[13][columnNumber])
    {
        beat6.currentTime = 0;
        beat6.play();
    }

    if(rowArray[15][columnNumber])
    {
        beat7.currentTime = 0;
        beat7.play();
    }

    if(rowArray[17][columnNumber])
    {
        beat8.currentTime = 0;
        beat8.play();
    }
}

var arrayColor = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


document.getElementById('scrollDown').addEventListener('click', function(){

    if(collapse)
    {
        console.log("Expanding");
        collapse = false;
        setTimeout(function(){
            document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
        },  400);
    }
    else 
    {
        collapse = true;
        console.log("Collapse");
        document.getElementById('top').scrollIntoView({behavior: "smooth"});

        //Stop Loop

        stopVar = true;
        clearInterval(intervalVar);
    }
    
});

document.getElementById("start").addEventListener('click', function(){

    stopVar = false;

    clearInterval(intervalVar);
   
    intervalVar = setInterval(function(){

        count++;

        let def = "White";
        let change = "Black";

        if(count == 1)
        {
            playCorrectBeat(1);
            rowArray[0][19].style.backgroundColor = def;
            rowArray[0][0].style.backgroundColor = change;
            
            
        }
        else if(count == 2)
        {
            playCorrectBeat(2);
            rowArray[0][0].style.backgroundColor = def;
            rowArray[0][1].style.backgroundColor = change;

            
        }
        else if(count == 3)
        {
            playCorrectBeat(3);
            rowArray[0][1].style.backgroundColor = def;
            rowArray[0][2].style.backgroundColor = change;

        }
        else if(count == 4)
        {
            playCorrectBeat(4);
            rowArray[0][2].style.backgroundColor = def;
            rowArray[0][3].style.backgroundColor = change;

        }
        else if(count == 5)
        {
            playCorrectBeat(5);
            rowArray[0][3].style.backgroundColor = def;
            rowArray[0][4].style.backgroundColor = change;

        }
        else if(count == 6)
        {
            playCorrectBeat(6);
            rowArray[0][4].style.backgroundColor = def;
            rowArray[0][5].style.backgroundColor = change;


        }
        else if(count == 7)
        {
            playCorrectBeat(7);
            rowArray[0][5].style.backgroundColor = def;
            rowArray[0][6].style.backgroundColor = change;

            
        }
        else if(count == 8)
        {
            playCorrectBeat(8);
            rowArray[0][6].style.backgroundColor = def;
            rowArray[0][7].style.backgroundColor = change;
        }
        else if(count == 9)
        {
            playCorrectBeat(9);
            rowArray[0][7].style.backgroundColor = def;
            rowArray[0][8].style.backgroundColor = change;
        }
        else if(count == 10)
        {
            playCorrectBeat(10);
            rowArray[0][8].style.backgroundColor = def;
            rowArray[0][9].style.backgroundColor = change;
        }
        else if(count == 11)
        {
            playCorrectBeat(11);
            rowArray[0][9].style.backgroundColor = def;
            rowArray[0][10].style.backgroundColor = change;
        }
        else if(count == 12)
        {
            playCorrectBeat(12);
            rowArray[0][10].style.backgroundColor = def;
            rowArray[0][11].style.backgroundColor = change;
        }
        else if(count == 13)
        {
            playCorrectBeat(13);
            rowArray[0][11].style.backgroundColor = def;
            rowArray[0][12].style.backgroundColor = change;
        }
        else if(count == 14)
        {
            playCorrectBeat(14);
            rowArray[0][12].style.backgroundColor = def;
            rowArray[0][13].style.backgroundColor = change;
        }
        else if(count == 15)
        {
            playCorrectBeat(15);
            rowArray[0][13].style.backgroundColor = def;
            rowArray[0][14].style.backgroundColor = change;
        }
        else if(count == 16)
        {
            playCorrectBeat(16);
            rowArray[0][14].style.backgroundColor = def;
            rowArray[0][15].style.backgroundColor = change;
        }
        else if(count == 17)
        {
            playCorrectBeat(17);
            rowArray[0][15].style.backgroundColor = def;
            rowArray[0][16].style.backgroundColor = change;
        }
        else if(count == 18)
        {
            playCorrectBeat(18);
            rowArray[0][16].style.backgroundColor = def;
            rowArray[0][17].style.backgroundColor = change;
        }
        else if(count == 19)
        {
            playCorrectBeat(19);
            rowArray[0][17].style.backgroundColor = def;
            rowArray[0][18].style.backgroundColor = change;
        }
        else if(count == 20)
        {
            playCorrectBeat(20);
            rowArray[0][18].style.backgroundColor = def;
            rowArray[0][19].style.backgroundColor = change;
        }

        if(count == 20)
        {
            count = 0;
        }
    }, 1000/document.getElementById('slider').value);

});

document.getElementById("stop").addEventListener('click', function(){

    stopVar = true;

    clearInterval(intervalVar);
});

document.getElementById('slider').addEventListener('input', function(){
    var value = document.getElementById('slider').value;

    
    clearInterval(intervalVar);

    //document.body.style.backgroundColor = getRandomColor();

    if(!stopVar)
    {
        intervalVar = setInterval(function(){

            count++;
        
            let def = "White";
            let change = "Black";
        
            if(count == 1)
            {
                playCorrectBeat(1);
                rowArray[0][19].style.backgroundColor = def;
                rowArray[0][0].style.backgroundColor = change;
                
                
            }
            else if(count == 2)
            {
                playCorrectBeat(2);
                rowArray[0][0].style.backgroundColor = def;
                rowArray[0][1].style.backgroundColor = change;
        
                
            }
            else if(count == 3)
            {
                playCorrectBeat(3);
                rowArray[0][1].style.backgroundColor = def;
                rowArray[0][2].style.backgroundColor = change;
        
            }
            else if(count == 4)
            {
                playCorrectBeat(4);
                rowArray[0][2].style.backgroundColor = def;
                rowArray[0][3].style.backgroundColor = change;
        
            }
            else if(count == 5)
            {
                playCorrectBeat(5);
                rowArray[0][3].style.backgroundColor = def;
                rowArray[0][4].style.backgroundColor = change;
        
            }
            else if(count == 6)
            {
                playCorrectBeat(6);
                rowArray[0][4].style.backgroundColor = def;
                rowArray[0][5].style.backgroundColor = change;
        
        
            }
            else if(count == 7)
            {
                playCorrectBeat(7);
                rowArray[0][5].style.backgroundColor = def;
                rowArray[0][6].style.backgroundColor = change;
        
                
            }
            else if(count == 8)
            {
                playCorrectBeat(8);
                rowArray[0][6].style.backgroundColor = def;
                rowArray[0][7].style.backgroundColor = change;
            }
            else if(count == 9)
            {
                playCorrectBeat(9);
                rowArray[0][7].style.backgroundColor = def;
                rowArray[0][8].style.backgroundColor = change;
            }
            else if(count == 10)
            {
                playCorrectBeat(10);
                rowArray[0][8].style.backgroundColor = def;
                rowArray[0][9].style.backgroundColor = change;
            }
            else if(count == 11)
            {
                playCorrectBeat(11);
                rowArray[0][9].style.backgroundColor = def;
                rowArray[0][10].style.backgroundColor = change;
            }
            else if(count == 12)
            {
                playCorrectBeat(12);
                rowArray[0][10].style.backgroundColor = def;
                rowArray[0][11].style.backgroundColor = change;
            }
            else if(count == 13)
            {
                playCorrectBeat(13);
                rowArray[0][11].style.backgroundColor = def;
                rowArray[0][12].style.backgroundColor = change;
            }
            else if(count == 14)
            {
                playCorrectBeat(14);
                rowArray[0][12].style.backgroundColor = def;
                rowArray[0][13].style.backgroundColor = change;
            }
            else if(count == 15)
            {
                playCorrectBeat(15);
                rowArray[0][13].style.backgroundColor = def;
                rowArray[0][14].style.backgroundColor = change;
            }
            else if(count == 16)
            {
                playCorrectBeat(16);
                rowArray[0][14].style.backgroundColor = def;
                rowArray[0][15].style.backgroundColor = change;
            }
            else if(count == 17)
            {
                playCorrectBeat(17);
                rowArray[0][15].style.backgroundColor = def;
                rowArray[0][16].style.backgroundColor = change;
            }
            else if(count == 18)
            {
                playCorrectBeat(18);
                rowArray[0][16].style.backgroundColor = def;
                rowArray[0][17].style.backgroundColor = change;
            }
            else if(count == 19)
            {
                playCorrectBeat(19);
                rowArray[0][17].style.backgroundColor = def;
                rowArray[0][18].style.backgroundColor = change;
            }
            else if(count == 20)
            {
                playCorrectBeat(20);
                rowArray[0][18].style.backgroundColor = def;
                rowArray[0][19].style.backgroundColor = change;
            }
        
            if(count == 20)
            {
                count = 0;
            }
        }, 1000/value);
    }      
});

document.getElementById('reset').addEventListener('click', function(){
for(var a = 2; a < rowArray.length; a = a+2)
{

    for(var i = 0; i < rowArray[a].length; i++)
    {
        let outerIndex = a;
        let innerIndex = i;
        
        rowArray[a][i].style.backgroundColor = "Grey";
        rowArray[a+1][i] = false;
    }
}
});

function playClap() {
    beat1.play();
  }
  function playSnap() {
    beat2.play();
  }
  function playButton() {
    beat3.play();
  }
  function playLocker() {
    beat4.play();
  }
  function playCard() {
    beat5.play();
  }
  function playPaper() {
    console.log("test")
    beat6.play();
  }
  function playBin() {
      console.log("test")
    beat7.play();
  }
  function playSponge() {
      console.log("test")
    beat8.play();
  }
  


console.log(document.getElementById('slider').value);





