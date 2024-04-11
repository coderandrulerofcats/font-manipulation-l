let leftWristX = 0;
let rightWristX = 0;
let video;
let poseNet;
let poses = [];

function setup() {
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    // Create a webcam capture
    video = createCapture(VIDEO);
    video.size(550, 500);
    

    // Load the PoseNet model
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    // Draw webcam feed onto canvas
    image(video, 0, 0, 550, 500);

    // Add background color
    background("purple");

    // Calculate dynamic text size
    let textSizeDifference = Math.floor(rightWristX - leftWristX);
    textSize(textSizeDifference);

    // Set text color
    fill(255); // White text

    // Create text on canvas
    text('Ahmad', 50, 200); // You can change x and y coordinates as per your requirement
}

function modelLoaded() {
    console.log("Posenet Is initialized. Go do whatever");
}

function gotPoses(results) {
    if (results.length > 0) {
        poses = results;

        // Store x coordinates of left and right wrists
        leftWristX = poses[0].pose.keypoints[9].position.x;
        rightWristX = poses[0].pose.keypoints[10].position.x;
    }
}
