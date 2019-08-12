//Made by Tomás Sáez
// Piano with genetic algorithm

//Thanks to daviddeborin for the audio files
//His repo: https://github.com/daviddeborin/88-Key-Virtual-Piano/tree/master/src


var whiteNotesSize;
var blackNotesSize;
var scl;
var whitePieces = [];
var blackPieces = [];
var posX,posY;


function setup(){
  whiteNotesSize = 35;
  blackNotesSize = whiteNotesSize;
  scl = 30;
  iteration = 1;
  
  createCanvas(1200,650);
  frameRate(60);
  
  background(101);
  
  preload();
}

function draw(){
  
  for(var i = 0; i < whitePieces.length;i++){
      whitePieces[i].show();
  }

  for(var i = 0; i < blackPieces.length; i++){
    if(blackPieces[i] == null){}
    else{
      blackPieces[i].show();
    }

  }

}

function mousePressed(){
  for(var i = 0; i < whitePieces.length;i++){
    whitePieces[i].clicked(mouseX,mouseY);
  }
  
  for(var i = 0; i < blackPieces.length;i++){
    if(blackPieces[i] == null){}
    else{
      blackPieces[i].clicked(mouseX,mouseY);
    }
  }

}


function keyPressed(){
  
  if (keyCode === 65) { // a
    sound_2.setVolume(1);
    sound_2.play();
  }
  if(keyCode === 83){ // s
    sound_2.setVolume(1);
    sound_2.play();
  }
  if (keyCode === 68) { //d
    sound_2.setVolume(1);
    sound_2.play();
  } 
  if(keyCode === 70){ //f
    sound_2.setVolume(1);
    sound_2.play();
  }
  if(keyCode === 74){ //i
    sound_2.setVolume(1);
    sound_2.play();
  }
  if(keyCode === 75){ //i
    sound_2.setVolume(1);
    sound_2.play();
  }
  if(keyCode === 76){ //l
    sound_2.setVolume(1);
    sound_2.play();
  }
  return false;
}


function preload(){
  //draws minimum piano with 7 white and 5 blacks and then repeats
  createWhitePieces();
  createBlackPieces();
}

function createWhitePieces(){
  var count = 0;
  var intensityLevel = 2; //c2 , d2 , e2, ... 
  for(var i = 0; i < whiteNotesSize; i++)
  {
    posX = (scl * i) + 30;
    posY = height / 4;  

    //Creating white key
    whitePieces[i] = new WhitePiece(posX,posY);

    if(count == 7) 
    {
      count = 0; 
      intensityLevel++;
    }
    
    let keyValue = createWhiteKeyValue(count,intensityLevel);
    //Assigning sound to this key
    whitePieces[i].assignKeyValue(keyValue);

    count += 1;
  }

}

function createWhiteKeyValue(i,intensityLevel){
  //From ASCII table
  //https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html

  // 1. Create letter inside the intensity level
  var keyValue = 67; //start with C
  keyValue += i; 

  if(keyValue == 72){//if the value is H
    keyValue = 65;
  } else if(keyValue == 73){ //if the value is I
    keyValue = 66;
  } else if(keyValue > 73){
    console.log("Please check counter variable, keyValue shouldn't be higher than 73");
  }

  //Convert ascii value to letter
  var letter = String.fromCharCode(keyValue);
  // 2. Assign intensity level to letter and store it
  var sound = loadSound("piano-sound/" + letter + intensityLevel + ".mp4");

  // 3. Return sound
  return sound;
}

function createBlackPieces(){
  var count = 0;
  var intensityLevel = 2; //c2 , d2 , e2, ... 
  for(var i = 0; i < blackNotesSize;i++){
      posX = ( (scl * i) + (scl * 0.72) ) + 30;
      posY = 41;
      blackPieces[i] = new BlackPiece(posX,posY);

      if(
        i == 2 || i == 6 || i == 9 || 
        i == 13 || i == 16 || i == 20 || 
        i == 23 || i == 27 || i == 30 || 
        i == 34
        ){
        blackPieces[i] = null;
        continue;
      }

      //There are only 5 black pieces inside 7 whites
      if(count >= 5) 
      {
        count = 0; 
        intensityLevel++;
      }

      let keyValue = createBlackKeyValue(count,intensityLevel);
      //Assigning sound to this key
      blackPieces[i].assignKeyValue(keyValue);
      count++;

  }
}

function createBlackKeyValue(i,intensityLevel){
  //From ASCII table
  //https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html

  if(intensityLevel > 6) // is higher than c6, d6, e6, ... (I don't have files higher than 6 :'( )
    return;

  // 1. Create letter inside the intensity level
  var keyValue = 67; //start with C
  keyValue += i; 

  console.log(i);

  if(keyValue == 69){//if the value is E
    keyValue = 70; //Assign F
  }else if(keyValue == 70){ //If the value is F
    keyValue = 71; //Assign G
  }else if(keyValue == 71){ //If the value is G
    keyValue = 65; //Assign A
  }


  //Convert ascii value to letter
  var letter = String.fromCharCode(keyValue);
  // 2. Assign intensity level to letter and store it
  var sound = loadSound("piano-sound/" + letter + "ha"  + intensityLevel + ".mp4");
  //console.log(sound);

  // 3. Return sound
  return sound;
}
