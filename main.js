girls_like_you_song = "";
anyone_song = "";
leftWrist_x = 0;
leftWristY = 0;
rightWrist_x = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_girls_like_you = "";
song1_status = "";
song2_status = "";

function setup(){
    canvas = createCanvas(600, 530);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload(){
    girls_like_you_song = loadSound("music.mp3");
    anyone_song = loadSound("music1.mp3");
}

function draw(){
    image(video, 0, 0, 600, 530);
song1_status = girls_like_you_song.isPlaying();
song2_status = anyone_song.isPlaying();
    fill("#0df4fc");
    stroke("#fa9507");
    
    

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        anyone_song.stop()
        if(song1_status == false)
        {
            girls_like_you_song.play()
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Girls Like You";
        }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        anyone_song.stop()
        if(song2_status == false)
        {
            girls_like_you_song.play()
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Girls Like You";
        }
    }
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x +" leftWrist_y = "+ leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x +" rightWrist_y = "+ rightWrist_y);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}


