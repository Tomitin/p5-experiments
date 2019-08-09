// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class to describe a population of "creatures"

// Initialize the population

class Population{
    constructor(m,num){
        this.mutationRate = m; // Mutation rate
        this.population = []; // Array to hold the current population
        this.matingPool = []; // ArrayList which we will use for our "mating pool"
        this.generations = 0;  // Number of generations

        //make a new set of creatures
        for(let i = 0; i < num; i++){
            var location = createVector(width / 2, height );
            this.population[i] = new Rocket(location, new DNA());
        }
    }

    // Calculate fitness for each creature
    fitness(){
        for (let i = 0; i < this.population.length; i++){
            this.population[i].calcFitness();
        }
    }

    // Generate a mating pool
    selection(){
        //Clear the ArrayList from the previous mating pool
        this.matingPool = [];

        //Calculate best fitness of the whole population
        var maxFitness = this.getMaxFitness();

        for(let i = 0; i < this.population.length; i++){
            //https://p5js.org/reference/#/p5/map
            //Re-maps a number from one range to another.
            var fitnessNormal = map(this.population[i].getFitness(),0,maxFitness,0,1);
            var n = floor(fitnessNormal * 100);

            for(let j = 0; j < n; j++){
                this.matingPool.push(this.population[i]);

            }
        }
    }

    
    // Making the next generation
    reproduction(){
        // Refill the population with children from the mating pool
        for(var i = 0; i < this.population.length; i++){
            // Sping the wheel of fortune to pick two parents
            var m = floor(random(this.matingPool.length));
            var d = floor(random(this.matingPool.length));

            //pick two parents
            var mom = this.matingPool[m];
            var dad = this.matingPool[d];

            //Get their genes
            var momGenes = mom.getDNA();
            var dadGenes = dad.getDNA();

            //Make a baby
            var child = dadGenes.crossover(momGenes);
            //Mutate their genes
            child.mutate(this.mutationRate);
            
            //Fill the new population with the new child
            var location = createVector(width / 2, height);
            this.population[i] = new Rocket(location, child, this.population.length);
        }
        this.generations++;
    }
    
    live(obs){
        // Run every rocket
        for(var i = 0; i < this.population.length; i++){
            // If it finishes, mark it down as done!
            this.population[i].checkTarget();
            this.population[i].run(obs);
        }
    }

    // Did anything finish?
    targetReached() {
        for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].hitTarget) return true;
        }
        return false;
    }      
    
    /* ======================================================================================
    Getters
    */

    getGenerations(){
        return this.generations;
    }
    
    // Find highest fitness for the population
    getMaxFitness(){
        var record = 0;
        for(var i = 0; i < this.population.length; i++){
            if(this.population[i].getFitness() > record){
                record = this.population[i].getFitness();
            }
        }
        return record;
    }
    
}