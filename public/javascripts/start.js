document.getElementById('button').addEventListener('click', function(){
    document.getElementById('projectDiv').scrollIntoView({behavior: "smooth"});
});


var indexProject = 3;
var project = {
    0:["Javascript Snake","/snakegame"],
    1:["Word Finder","/wordfinder"],
    2:["Soundboard","/sound"]
}

for(var i = 0; i < 3;i++)
{
    var div = document.createElement('div');
    div.classList.add('grid-item');

    div.innerHTML = project[i][0];
    document.getElementsByClassName('grid-container')[0].appendChild(div);


    (function(){
        var index = i;
        div.addEventListener('click', function(){
            var form = document.createElement('form');
            form.action = project[index][1];
            form.method = "GET";

            document.body.appendChild(form);
            form.submit();
        });
    }());
}