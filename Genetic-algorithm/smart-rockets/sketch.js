// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of p5.Vectors
// Each p5.Vector acts as a force for each frame of animation
// Imagine a booster on the end of the rocket that can point in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

let lifetime; // How long should each generation live


let population; // Population
let lifeCounter; // Timer for cycle of generation
let recordTime; //Fastest time to target

let target; // Target position

let obstacles = []; //an array list to keep track of all the obstacles!


function setup(){
    createCanvas(640,360);
    // The number of cycles we will allow a generation to live
    lifetime = 230;

    // Initialize variables
    lifeCounter = 0;
    recordTime = lifetime;

    target = new Obstacle(width / 2 -12, 24, 24, 24);


    // Create a population with a mutation rate, and population max
    let mutationRate = 0.01;
    let popmax = 3;
    population = new Population(mutationRate,popmax);


    obstacles = [];
    obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
    // info = createP("");
    // info.position(10, 380);
}

function draw(){
    background(60);

    //Draw the start and target positions
    target.display();


    // If the generation hasn't ended yet
    if (lifeCounter < lifetime){
        population.live(obstacles);
        if((population.targetReached()) && (lifeCounter < recordTime)){
            recordTime = lifeCounter;
        }
        lifeCounter++;
    }else{
        lifeCounter = 0;
        population.fitness();
        population.selection();
        population.reproduction();
    }

    for(let i = 0;i < obstacles.length; i++){
        obstacles[i].display();
    }

    // Display some info
    fill(0);
    noStroke();
    text("Generation #: " + population.getGenerations(), 10, 18);
    text("Cycles left: " + (lifetime - lifeCounter), 10, 36);
    text("Record cycles: " + recordTime, 10, 54);
}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
    target.position.x = mouseX;
    target.position.y = mouseY;
    recordtime = lifetime;
}