var rows, cols;

var current;
var grid = [];
var stack = [];
var w = 30;

function setup(){
  createCanvas(400,400);

  cols = floor(width/w);
  rows = floor(height/w);

  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++){
      //we create a cell: [0][0], [0][1], ...
      var cell = new Cell(i,j);
      //then push it into the grid
      grid.push(cell);
    }
  }

  //1.Make the initial cell the current cell and mark it as visited
  current = grid[0];
}

function draw(){
  background(0);

  //now we want to display the grid
  for(var i = 0; i < grid.length; i++){
    // now, grid has the same properties as cell, so we can access to its show function
    grid[i].show();
  }
  //make the current cell visited
  current.visited = true;
  current.highlight();

  //current is still a Cell, so we can access to its properties
  var nextNeighbour = current.checkForNeighbours();
  console.log(nextNeighbour);
  //if the current cell found something
  if(nextNeighbour){

    //4. Push the current cell to the stack
    stack.push(nextNeighbour); 

    removeWalls(current,nextNeighbour);
    
    //6.Make the chosen cell the current cell and mark it as visited
    nextNeighbour.visited = true;
    current = nextNeighbour;
  } else if(stack.length > 0){ //7.Else if stack is not empty

    //8.Pop a cell from the stack
    var deletedCell = stack.pop();
    //9.Make it the current cell
    current = deletedCell;
    current.reVisited = true;
  }
}

function Index(i, j){
  //if row is less than 0 or column is less than 0 OR row is more than the penultimate row or column is mroe than the penultimate col
  if(i < 0 || j < 0 || i > rows-1 || j > cols-1){
    return -1;
  }

  return index = i + j * cols;
}

function removeWalls(start, end){
  //To the..
  //TOP
  if(start.j - end.j > 0){
    start.walls[0] = false;
    end.walls[2] = false;
  }
  //RIGHT
  if(start.i - end.i < 0){
    start.walls[1] = false;
    end.walls[3] = false;
  }
  //BOTTOM
  if(start.j - end.j < 0){
   start.walls[2] = false;
    end.walls[0] = false; 
  }
  //LEFT
  if(start.i - end.i > 0){
    start.walls[3] = false;
    end.walls[1] = false;
  }
}