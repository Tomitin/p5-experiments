//Snake Game with Genetic Algorithms

//Tomás Sáez


//delete code
var snake;
var scl = 20;

var food;

//Genetics
let population;
let target;


function setup() {
  createCanvas(600, 600);
  frameRate(20);
  pickLocation();

  
  let mutationRate = 0.01;
  let popmax = 5;
  population = new Population(mutationRate,popmax);
}

function draw() {
  background(51);


  // snake.death();
  // snake.update();
  // snake.show();
  
  // If the generation hasn't ended yet
  if(population.isAlive())
  {
    //if the current snake eats food, pick a new random location
    if(population.eats(food)){
      pickLocation();
    }
    //spawn one by one 
    population.live();

  }else{
    //Process of new generation
    population.fitness();
    population.selection();
    population.reproduction();
  }
  
  //Display target
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);


  // Display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
}


function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);

}






// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     snake.dir(0, -1);
//   } else if (keyCode === DOWN_ARROW) {
//     snake.dir(0, 1);
//   } else if (keyCode === RIGHT_ARROW) {
//     snake.dir(1, 0);
//   } else if (keyCode === LEFT_ARROW) {
//     snake.dir(-1, 0);
//   }
// }