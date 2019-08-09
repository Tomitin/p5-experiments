//https://en.wikipedia.org/wiki/Dijkstra's_algorithm

function arrayRemove(arr, value) {

  return arr.filter(function(ele){
      return ele != value;
  });

}

var start,end;

var current;
var grid = [];

var unvisitedSet = [];

// How many columns and rows?
var cols = 50;
var rows = 50;
// Width and height of each cell of grid
var w, h;


function setup(){
  createCanvas(400,400);

  w = floor(width/cols);
  h = floor(height/rows);

  //creating the grid
  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){

      var cell = new Cell(j,i);
      grid.push(cell);

      //STEP 1
      unvisitedSet.push(cell);
    }
  }

  //STEP 2
  end = grid[Index(rows - 1, cols - 1)];
  console.log(end);
  current = grid[0];
  current.tentDistValue = 0;
}

function draw(){
  background(0);


  for(var i = 0; i < grid.length; i++){
      grid[i].show(color(255, 0, 0, 50));
  }


  var neighbours = current.checkForNeighbours();
  var lowestDistanceNode = 0; 
  console.log(neighbours);
  if(neighbours.length > 0){
    for(var i = 0; i < neighbours.length; i++){
      neighbours[i].tentDistValue = neighbours[i].calculateDistance(current,neighbours[i]);
      //Compare the newly calculated tentative distance to the current assigned value and assign the smaller one
      if(neighbours[i].tentDistValue >= current.tentDistValue){
        current.tentDistValue = neighbours[i].tentDistValue;
        lowestDistanceNode = i;
      }
    }
    current.visited = true;
    arrayRemove(unvisitedSet,current);

    console.log(end);
    if(end.visited){
      console.log("finished");
      noLoop();
    }else{
      current = neighbours[lowestDistanceNode];
    }
  }

}

function Index(i, j){
  //if row is less than 0 or column is less than 0 OR row is more than the penultimate row or column is mroe than the penultimate col
  if(i < 0 || j < 0 || i > rows-1 || j > cols-1){
    return -1;
  }

  return index = i + j * cols;
}

function Cell(i,j){
  this.i = i;
  this.j = j;

  this.tentDistValue = 9999999;
  //STEP 1
  this.visited = false;

  this.show = function(color){
    //it will print x = 0 * 10, x = 1 * 10, ...
    var x = this.i * w;
    //it will print y = 0 * 10, y = 1 * 10, ...
    var y = this.j * w;
    fill(color);
    rect(this.i * w, this.j * h, w, h);
    if(this.visited){
      noStroke();
      fill(255,0 , 255, 75);
      rect(x,y,w,w);
    }
  }

  
  this.calculateDistance = function(start,end){
    var d = dist(start.i, start.j, end.i, end.j);
    return d;
  }

  this.checkForNeighbours = function(){
    var neighbours = [];

    var top = grid[Index(i - 1,j)];
    var right = grid[Index(i,j + 1)];
    var bottom = grid[Index(i + 1, j)];
    var left = grid[Index(i, j - 1)];
    
    if(top && !top.visited){
      neighbours.push(top);
    }
    if(right && !right.visited){
        neighbours.push(right);
    }
    if(bottom && !bottom.visited){
        neighbours.push(bottom);
    }
    if(left && !left.visited){
        neighbours.push(left);
    }

    if(neighbours.length > 0){
      return neighbours;
    }else{
      return undefined;
    }

  }


}