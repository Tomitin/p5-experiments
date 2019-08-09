class DNA{
    constructor(newGenes){

        if(newGenes){
            this.genes = newGenes;
        }else{

            this.genes = [];
            this.genes[0] = createVector()

        }

        //continuar
    }

    crossover(partner){
        let child = new Array(this.genes.length);
        //pick a midpoint
        let crossover = int(random(this.genes.length));

        // Take "half" from one and "half" from the other
        for(let i = 0; i < this.genes.length; i++){
            if(i > crossover) child[i] = this.genes[i];
            else child[i] = partner.genes[i];
        }
        let newGenes = new DNA(child);
        return newGenes;
    }

    mutate(m){
        for(let i = 0; i < this.genes.length; i++){
            if(random(1) < m){
                this.genes[i] = createVector( floor(random(-1,1)), floor(random(-1,1)) );
            }
        }
    }
}