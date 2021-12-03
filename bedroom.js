img = "";
objects = [];
status = "";
function preload() {
    img = loadImage("bed.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoded);
    document.getElementById("status").innerHTML = "status_detecting_objects"
}
function modelLoded() {
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(img, gotResult);
}
function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status:object is detected";
            fill("#660000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#660000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
