//Code extracted from:
//https://www.youtube.com/watch?v=_cXuvTQl090&list=PLRqwX-V7Uu6bCN8LKrcMa6zF4FPtXyXYj&index=6
var data = [];

var m = 1;
var b = 0;

function setup(){
  createCanvas(400,400);
  background(51);
}

function mousePressed(){
  var x = map(mouseX,0,width,0,1);
  var y = map(mouseY,0,width,1,0);

  var point = createVector(x,y);
  data.push(point);
}

function draw(){
  for(var i = 0; i < data.length;i++){
    var x = map(data[i].x,0,1,0,width);
    var y = map(data[i].y,1,0,0,height);
    fill(255);
    stroke(255);
    ellipse(x,y,8,8);
  }
  if(data.length > 1){
    gradientDescent();
    drawLine();
  }
}

function gradientDescent(){

  var learning_rate = 0.01;

  for(var i = 0; i < data.length;i++){
    var x = data[i].x;
    var y = data[i].y;

    var guess = m * x + b;

    var error = y - guess;

    m = m + (error * x) * learning_rate;
    b = b + error * learning_rate;
  }


}

function drawLine(){
  //m slope over time
  //b is the value when the y intercepts x when x = 0
  //source : https://www.youtube.com/watch?v=m9-_sxSU_WQ
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;


  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  line(x1,y1,x2,y2);
}