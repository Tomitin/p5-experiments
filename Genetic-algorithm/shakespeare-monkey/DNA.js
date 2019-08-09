// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

function newChar(){
    let c = floor(random(63,122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;

    return String.fromCharCode(c);
}


class DNA{
    constructor(num){

        this.genes = [];
        this.fitness = 0;
    
        for(let i = 0; i < num; i++){
            this.genes[i] = newChar(); // Pick from range of chars for every character in the genes string
        }
    }

    // Fitness function (returns floating point % of "correct" characters)
    calcFitness(target){
        var score = 0;
        //we analize the string, char by char
        for(let i = 0; i < this.genes.length; i++){
            if(this.genes[i] == target.charAt(i)){
                score++;
            }
        }
        //EX: mac/cat  = 1 / 3 = 33.33% 
        this.fitness = score / target.length;
        this.fitness = pow(this.fitness, 2);
    }

    crossover(partner){
        // A new child
        let child = new DNA(this.genes.length);

        let midpoint = floor(random(this.genes.length)); //pick a midpoint

        // Half from one, half from the other
        for(let i = 0; i < this.genes.length; i++){
            if(i > midpoint) child.genes[i] = this.genes[i]; // this refers to partnerA
            else child.genes[i] = partner.genes[i];
        }
        //once finished
        return child;
    }

    // Based on a mutation probability, picks a new random character
    mutate(mutationRate){
        for(let i = 0; i < this.genes.length; i++){
            if(random(1) < mutationRate){
                this.genes[i] = newChar();
            }
        }
    }
    

    getPhrase(){
        return this.genes.join("");
    }
}