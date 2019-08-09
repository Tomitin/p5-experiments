// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// DNA is an array of vectors

class DNA{
    constructor(newGenes){
        this.maxforce = 0.3;

        if(newGenes){
            this.genes = newGenes;
        } else{
            //The genetic sequence
            this.genes = [];
            
            // Constructor (makes a DNA of random PVectors)
            for(let i = 0; i < lifetime; i++){
                let angle = random(TWO_PI);
                //https://p5js.org/reference/#/p5.Vector/fromAngle
                this.genes[i] = createVector(cos(angle), sin(angle));
                //Multiplies angle
                this.genes[i].mult(random(0, this.maxforce));
            }
        }
        
        // Let's give each Rocket an extra boost of strength for its first frame
        this.genes[0].normalize();
    }

    //CROSSOVER
    crossover(partner){
        let child = new Array(this.genes.length);
        //pick a midpoint
        let crossover = int(random(this.genes.length));

        // Take "half" from one and "half" from the other
        for(let i = 0; i < this.genes.length; i++){
             //if greater than the half, takes the last half of genes from his daddy
             if(i > crossover){ 
                child[i] = this.genes[i]; 
             }//if not, first half from her mother
             else child[i] = partner.genes[i];
        }
        let newGenes = new DNA(child);
        return newGenes;
    }

    // Based on a mutation probability, picks a new random Vector
    mutate(m){
        for(let i = 0; i < this.genes.length; i++){
            //less than mutation rate
            if(random(1) < m){
                let angle = random(TWO_PI);
                this.genes[i] = createVector(cos(angle), sin(angle));
                this.genes[i].mult(random(0, this.maxforce));
                if (i == 0) this.genes[i].normalize();
            }
        }
    }
}