//Made by Tomás Sáez
// Piano with genetic algorithm
//This piano learns every song you told him to

//Styles on hold, etc

var pianoSize;
var scl;
var whitePieces = [];
var blackPieces = [];
var posX;
var posY;

function setup(){
  pianoSize = 5;
  scl = 30;
  createCanvas(1200,650);
  frameRate(60);
  preload();
}

function draw(){
  background(101);
  //draws minimum piano with 7 white and 5 blacks and then repeats
  for (var i = 0; i < pianoSize; i++) {
    shoWhitePieces(i);
    //blackPieces(i);

	}

}

function shoWhitePieces(repetible){
  noFill();
	for (var i = 1; i < 8; i++) {
      fill(255);
      if(repetible > 0){
        posX = scl * ( (7 * repetible) + i);
      }
      else{
        posX = scl * i;
        // rect(scl * i, height / 4, scl, 250, 0, 0, 5, 5);
      }
      posY = height / 4;  
      
      whitePieces[i] = new WhitePiece(posX,posY);
      whitePieces[i].show();
      
  }
}

function blackPieces(repetible){
  fill(0);
  

  for (var i = 1; i < 3; i++) {
    if(repetible > 0){
      posX = scl * ( (7 * repetible) + i ) + scl * 0.72;
      //rect(, , scl / 2, 125, 0, 0, 15, 15);
    }else{
      posX = scl * i + scl * 0.72;
      //rect(, height / 4, scl / 2, 125, 0, 0, 15, 15);
    }
    posY = height / 4;

    blackPieces[i] = new BlackPiece(posX,posY);
    blackPieces[i].showLeft();
    blackPieces[i].showRight();
  }

  for(var i = 4; i < 7; i++){
    if(repetible > 0){
      rect(scl * ( (7 * repetible) + i) + scl * 0.72, height / 4, scl / 2, 125, 0, 0, 15, 15);
    }else{
      rect(scl * i + scl * 0.72, height / 4, scl / 2, 125, 0, 0, 15, 15);
    }
    
  }  
  
}

function preload() {
  sound_a = loadSound('piano-sound/c3.ogg');
  sound_s = loadSound('piano-sound/d3.ogg');
  sound_d = loadSound('piano-sound/e3.ogg');
  sound_f = loadSound('piano-sound/f3.ogg');
  sound_j = loadSound('piano-sound/g3.ogg');
  sound_k = loadSound('piano-sound/a3.ogg');
  sound_l = loadSound('piano-sound/b3.ogg');
  sound_semicolon = loadSound('piano-sound/ha4.ogg');
}

function keyPressed(){
  
  if (keyCode === 65) { // a
    sound_a.setVolume(1);
    sound_a.play();
  }
  if(keyCode === 83){ // s
    sound_s.setVolume(1);
    sound_s.play();
  }
  if (keyCode === 68) { //d
    sound_d.setVolume(1);
    sound_d.play();
  } 
  if(keyCode === 70){ //f
    sound_f.setVolume(1);
    sound_f.play();
  }
  if(keyCode === 74){ //j
    sound_j.setVolume(1);
    sound_j.play();
  }
  if(keyCode === 75){ //k
    sound_k.setVolume(1);
    sound_k.play();
  }
  if(keyCode === 76){ //l
    sound_l.setVolume(1);
    sound_l.play();
  }
  return false;
}

class WhitePiece{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  show(){
    rect(this.x, this.y / 4, scl, 250, 0, 0, 5, 5);
  }

}

class BlackPiece{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  showLeft(){
    rect(this.x, this.y, scl / 2, 125, 0, 0, 15, 15);
  }

  showRight(){

  }
}















/*

//add to script
function whiteNotes(){
  fill(0);
  for(var j = 1; j < nWhiteNotes + 1; j++){
    text('Do', scl,height / 2 );
    text('Re', scl * 2, height / 2);
    text('Mi', scl * 3, height / 2);
    text('Fa', scl * 4, height / 2);
    text('Sol', scl * 5,height / 2);
    text('La', scl * 6, height / 2);
    text('Si', scl * 7, height / 2);
  }  
}
//add to script
function blackNotes(){
  fill(255);
  text('Do#', 90, height -200);
  text('Re#', 140, height -200);
  
  text('Fa#', 240, height -200);
  text('Sol#', 290, height -200);
  text('La#', 340, height -200);
  
  text('Do#', 440, height -200);
  text('Re#', 490, height -200);
  
  text('Fa#', 590, height -200);
  text('Sol#', 640, height -200);
  text('La#', 690, height -200);
}

*/