function mrblackplay()
{
    var audio = document.getElementsByTagName("audio")[0];
    audio.play();
}

// update on any window size change.
window.addEventListener("resize", Resize);
setInterval(Update, 30);
window.onload = Resize;

var created = false;

var niceColour = 'pink';
var pointsArray = [];
var pointsVelocities = [];
var numPoints = 50;
var distanceForLine = 175;
var speed = 0.2;
var maxVelocity = 1;

function Update()
{
    ///////////////////////////////////////////////////////////////
    //////////////////////////GLOBAL
    ///////////////////////////////////////////////////////////////
    var canvas = document.getElementById('background');
    var ctx = canvas.getContext('2d'); 
    var i = 0;//loop
    ///////////////////////////////////////////////////////////////
    //////////////////////////CREATION
    ///////////////////////////////////////////////////////////////
    if(created == false)
    {
        for(i = 0; i < numPoints; i++)
        {
            var randomX = Math.floor(Math.random() * canvas.width);
            var randomY = Math.floor(Math.random() * canvas.height);
            pointsArray[i] = [randomX, randomY];
            pointsVelocities[i] = [0,0];
        }
        created = true;
    }
    
    ///////////////////////////////////////////////////////////////
    //////////////////////////UPDATE
    ///////////////////////////////////////////////////////////////
    for(i = 0; i < numPoints; i++)
    {
        var direction = Math.random();

        if(direction < 0.2)
            pointsVelocities[i][0] += speed;
        else if(direction < 0.4)
            pointsVelocities[i][0] -= speed;
        else if(direction < 0.6)
            pointsVelocities[i][1] += speed;
        else if(direction < 0.8)
            pointsVelocities[i][1] -= speed;
        
        if(pointsVelocities[i][0] >= maxVelocity)pointsVelocities[i][0] = maxVelocity;
        if(pointsVelocities[i][0] <= -maxVelocity)pointsVelocities[i][0] = -maxVelocity;
        if(pointsVelocities[i][1] >= maxVelocity)pointsVelocities[i][1] = maxVelocity;
        if(pointsVelocities[i][1] <= -maxVelocity)pointsVelocities[i][1] = -maxVelocity;
    }
    
    for(i = 0; i < numPoints; i++)
    {
        pointsArray[i][0] += pointsVelocities[i][0];
        pointsArray[i][1] += pointsVelocities[i][1];
        
        if(pointsArray[i][0] >= canvas.width)
        {
            pointsArray[i][0] = canvas.width;
            pointsVelocities[i][0] -= 1.0;
        }
        if(pointsArray[i][0] <= 0)
        {
            pointsArray[i][0] = 0;
            pointsVelocities[i][0] += 1.0;
        }
        if(pointsArray[i][1] >= canvas.height)
        {
            pointsArray[i][1] = canvas.height;
            pointsVelocities[i][1] -= 1.0;
        }
        if(pointsArray[i][1] <= 0)
        {
            pointsArray[i][1] = 0;
            pointsVelocities[i][1] += 1.0;
        }
    }
    
    ///////////////////////////////////////////////////////////////
    //////////////////////////DRAW
    ///////////////////////////////////////////////////////////////
    ctx.clearRect (0, 0, ctx.canvas.width, ctx.canvas.height);
    
    for(i = 0; i < numPoints; i++)
    {
        drawPoint(ctx, pointsArray[i], 3);
        
        for(var j = 0; j < numPoints; j++)
        {
            if(distanceCheck(pointsArray[i], pointsArray[j], distanceForLine))
            {
                drawLineBetweenPoints(ctx, pointsArray[i], pointsArray[j]);
            }
        }
        
        //drawPoint(ctx, point2, 5);
        //
        
    }
}

function Resize()
{
    var canvas = document.getElementById('background');

    canvas.width = window.innerHeight;
    canvas.height =  window.innerHeight;
    
    Update();
}

///////////////////////////////////////////////////////////////
//////////////////////////UTILITY
///////////////////////////////////////////////////////////////
function distanceCheck(pointOne, pointTwo, r) {
    var dist_points = (pointOne[0] - pointTwo[0]) * (pointOne[0] - pointTwo[0]) + (pointOne[1] - pointTwo[1]) * (pointOne[1] - pointTwo[1]);
    r *= r;
    if (dist_points < r) {
        return true;
    }
    return false;
}    
    
function drawPoint(ctx, point, size)
{
    ctx.beginPath();
    ctx.arc(point[0], point[1], size, 0, 2 * Math.PI, false);
    ctx.fillStyle = niceColour;
    ctx.fill();
}

function drawLineBetweenPoints(ctx, pointOne, pointTwo)
{
    ctx.beginPath();
    ctx.moveTo(pointOne[0], pointOne[1]);
    ctx.lineTo(pointTwo[0], pointTwo[1]);
    ctx.strokeStyle = niceColour;
    ctx.lineWidth = 1;
    ctx.stroke()
}