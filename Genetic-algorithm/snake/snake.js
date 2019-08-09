// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM
class Snake{
    constructor(loc, dna_){
        //Fitness and DNA
        this.dna = dna_;
        this.fitness = 0;
        //Position to start
        this.position = loc.copy();
        this.timeAlive = 0;
        this.fruitsEaten = 0;
        // Some low number that will be beat instantly
        this.recordEaten = 0;
        this.recordAlive = 0;
        // Did I hit an obstacle(Am I alive?)
        this.hitObstacle = false;
        // this.currentSnake = []

        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 1;
        this.tail = [];
    }
    
    eat(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 20) {
            this.total++;
            this.fruitsEaten++;
            return true;
        } else {
            return false;
        }
    }
    
    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    
    run(){
        this.timeAlive++;
        // if I didn't hit an obstacle, please draw me
        if(!this.hitObstacle){
            this.update();
            this.show();
        }
    }
    
    checkDeath() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 20) {
                this.hitObstacle = true;
                console.log('starting over');
                // this.total = 0;
                // this.tail = [];
            }
        }
    }
    
    update() {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }
        
        this.x = this.x + (this.xspeed * scl);
        this.y = this.y + (this.yspeed * scl);
        
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    // FITNESS FUNCTION
    // survival = most time alive
    // food = quantity of food eated
    calcFitness(){
    
        //if the snake gets no fruits, looses 90% of fitness
        if(this.fruitsEaten == 0) this.fruitsEaten = 0.1;
        //Reward surviving as long as possible and eating fruits
        this.fitness = this.timeAlive + this.fruitsEaten;
        // Make the function exponential
        this.fitness = pow(this.fitness, 2);

    }

    //record of food eated
    //record of time alive


    /* ======================================================================================
    Getters
    */


    lives(){
        //If the snake didn't hit an obstacle, she is alive
        let alive = !this.hitObstacle;
        return alive;
    }

    getFitness(){
        return this.fitness;
    }

    getDNA(){
        return this.dna;
    }


    /* ======================================================================================
    UI
    */


   show(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
    }   
    
}