status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function preload()
{
    song = loadSound("Musical.mp3");
    image(video, 0, 0, 380, 380);
}

function draw()
{

    if (status != "")
    {
        image(video, 0, 0, 600, 500);
    r = random(255);
    g = random(255);
    b = random(255);
        objectDetector.detect(video, gotResult);
        for( i = 0; i< objects.length; i++)
        {
            
            document.getElementById("status").innerHTML = "status: detected objects";
            fill(rgb);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(rgb);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
   
        if (objects[i].label == "person")
        {
          document.getElementById("num_of_objects").innerHTML= "there is a baby here";
          console.log("stop");
          song.stop();
        }
    
        else
        {
            document.getElementById("num_of_objects").innerHTML= "there isn't a baby here";
            console.log("play");
            song.play();
        }

        if(objects.length == 0)
        {
            document.getElementById("num_of_objects").innerHTML= "there isn't a baby here";
            console.log("play");
            song.play();  
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
}

function gotResult( error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}