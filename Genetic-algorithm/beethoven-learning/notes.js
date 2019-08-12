class WhitePiece{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.isOverNote = false;
      this.sound;
      this.brightness = 255;
    }
    
    show(){
      fill(this.brightness);
        rect(this.x, this.y / 4, scl, 250, 0, 0, 5, 5);
      
      if(this.overNote(mouseX,mouseY)){
        this.brightness = 200;
      }else{
        this.brightness = 235;
      }
      
    }
    
    
    clicked(targetX,targetY){
      
      if(this.overNote(targetX,targetY)){
        //Play this.keyNote
        console.log(this.sound);
        this.sound.setVolume(1);
        this.sound.play();
        this.brightness = 150;
      }
      
    }

    assignKeyValue(keyNote){
      //Assign keyNote to this.keyNote
      this.sound = keyNote;
    }
    
    overNote(targetX,targetY){
      // check if mouse is inside the rectangle
      // mouseX >= x && mouseX <= x+width && mouseY >= y && mouseY <= y+height
      if(
        (targetY >= this.y - 125 && 
        targetX >= this.x + scl/5 && 
        targetX <= this.x + (scl - 1) - scl/5 ) && 
        targetX >= this.x && 
        targetX <= this.x + (scl - 1) &&        
        targetY <= this.y + 125
        ) 
      {
        this.isOverNote = true;
      } else {
        this.isOverNote = false;
      }
      return this.isOverNote;
      
    }
}
  
class BlackPiece{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.isOverNote = false;
        this.brightness = 0;
        this.sound;

    }

    show(){
        fill(this.brightness);
        rect(this.x, this.y, scl / 2, 125, 0, 0, 15, 15);
        
        if(this.overNote(mouseX,mouseY)){
        this.brightness = 55;
        }else{
        this.brightness = 0;
        }
    }

    assignKeyValue(keyNote){
      //Assign keyNote to this.keyNote
      this.sound = keyNote;
    }

    clicked(targetX,targetY){
        
        if(this.overNote(targetX,targetY)){
          console.log(this.sound);
          this.sound.setVolume(1);
          this.sound.play();
          this.brightness = 85;
        }
        
    }


    overNote(targetX,targetY){
        // check if mouse is inside the rectangle
        // mouseX >= x && mouseX <= x+width && mouseY >= y && mouseY <= y+height
        if (
          targetX >= this.x && 
          targetX <= this.x + scl/2 &&
          targetY >= this.y && 
          targetY <= this.y + 125
          ) 
        {
        this.isOverNote = true;
        } else {
        this.isOverNote = false;
        }
        return this.isOverNote;
        
    }

}
  
  