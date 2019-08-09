// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population{
    constructor(p,m,num){

        this.matingPool; // ArrayList which we will use for our "mating pool"

        this.population;  // Array to hold the current population
        this.target = p; //Target phrase
        this.mutationRate = m; //Mutation rate

        this.generations = 0; // Number of generations
        this.perfectScore = 1;
        this.finished = false; // Are we finished evolving?
        
        this.best = "";
        this.population = [];

        for(let i = 0; i < num; i++){
            //creating a population with the same length as the target string
            this.population[i] = new DNA(this.target.length);
        }

        //???
        this.matingPool = [];
        this.calcFitness();
    }

    // Fill our fitness array with a value for every member of the population
    calcFitness(){
        for(let i = 0; i < this.population.length;i++){
            this.population[i].calcFitness(target);
        }
    }

    // Generate a mating pool
    naturalSelection(){
        // Clear the ArrayList
        this.matingPool = [];

        var maxFitness = 0;
        
        for(let i = 0; i < this.population.length; i++){
            //Checking the fittest
            if(this.population[i].fitness > maxFitness){
                maxFitness = this.population[i].fitness;
            }
        }

        // Based on fitness, each member will get added to the mating pool a certain number of times
        // a higher fitness = more entries to mating pool = more likely to be picked as a parent
        // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
        for(let i = 0; i < this.population.length; i++){

            //if you want a size variable between 0 and 1, you would say:
            let fitness = map(this.population[i].fitness,0,maxFitness,0,1);
            //n is equal to fitness times 100, which leaves us with an integer between 0 and 100
            let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method

            for(let j = 0; j < n; j++){ // and pick two random numbers
                //add each member of the population to the mating pool N times
                this.matingPool.push(this.population[i]);
                
            }
        }
    }

     // Create a new generation
    generate(){
        // Refill the population with children from the mating pool
        for(let i = 0; i < this.population.length; i++){

            //pick two from the pool
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));
            
            //subscract the selected objects from the pool 
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];

            //crossover them
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);

            //access to the array and replace the older with a child
            this.population[i] = child;
        }
        this.generations++;
    }

    // Compute the current "most fit" member of the population
    evaluate(){
        let worldrecord = 0.0;
        let index = 0;
        for(let i = 0; i < this.population.length; i++){
            if(this.population[i].fitness > worldrecord){
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }

        this.best = this.population[index].getPhrase();
        //max fitness is 1 so...
        if(worldrecord === this.perfectScore){
            this.finished = true;
        }

    }

    isFinished(){
        return this.finished;
    }


    /* ======================================================================================
        UI 

    */

    getBest(){
        return this.best;
    }

    getGenerations(){
        return this.generations;
    }

    // Compute average fitness for the population
    getAverageFitness() {
        let total = 0;
        for(let i = 0; i < this.population.length; i++){
            total += this.population[i].fitness;
        }
        return total / (this.population.length);
    }

    allPhrases(){
        let everything = "";

        let displayLimit = min(this.population.length, 50);

        for(let i = 0; i < displayLimit; i++){
            everything += this.population[i].getPhrase() + "<br>";
        }

        return everything;
    }
}