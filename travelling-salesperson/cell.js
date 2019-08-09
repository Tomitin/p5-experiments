function Cell(i,j){
    this.i = i;
    this.j = j;
    //four walls for each side of the rectangle top right  bottom  left
    this.walls = [true,true,true,true];
    this.visited = false;
    this.reVisited = false;

    this.show = function(){
        //it will print x = 0 * 10, x = 1 * 10, ...
        var x = this.i * w;
        //it will print y = 0 * 10, y = 1 * 10, ...
        var y = this.j * w;
        stroke(255);

        //we print out our grid
        if(this.walls[0])
            line(x    , y    , x + w, y);
                
        if(this.walls[1])  
            line(x + w, y    , x + w, y + w);
    
        if(this.walls[2])  
            line(x + w, y + w, x    , y + w);

        if(this.walls[3])  
            line(x    , y + w, x    , y);
           
        // if it's visited, make it purple
        if(this.visited)
        {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x,y,w,w);
        }
        if(this.reVisited)
        {
            noStroke();
            fill(0, 255, 0, 100);
            rect(x,y,w,w);
        }

    }

    this.highlight = function(){
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill (0 , 0, 255, 100);   
        rect(x, y, w, w);
    }

    this.checkForNeighbours = function(){
        var neighbours = [];
        
        //check the top, right, bottom and left
        // we call grid and not index alone so we can take its properties later on
        var top = grid[Index(i - 1,j)];
        var right = grid[Index(i,j + 1)];
        var bottom = grid[Index(i + 1, j)];
        var left = grid[Index(i, j - 1)];

        //2.If the current cell has any neighbours which have not been visited
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

        //If the program found neighbours..
        if(neighbours.length > 0){
            //3.Choose randomly one of the unvisited neighbours
            var randomNeighbour = floor(random(0,neighbours.length));
            return neighbours[randomNeighbour];
        }else{
            return undefined;
        }
    }
}