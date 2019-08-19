const len = 784;
const total_data = 1000;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats_data;
let trains_data;
let rainbows_data;

let cats = {};
let trains = {};
let rainbows = {};

let nn;

function preload(){
  cats_data = loadBytes('data/cats1000.bin');
  trains_data = loadBytes('data/trains1000.bin');
  rainbows_data = loadBytes('data/rainbows1000.bin');
}

function setup(){
  createCanvas(280,280);
  background(255);

  prepareData(cats, cats_data, CAT);
  prepareData(rainbows, rainbows_data, RAINBOW);
  prepareData(trains, trains_data, TRAIN);

  nn = new NeuralNetwork(len, 64, 3);

  let training = [];
  training = training.concat(cats.training);
  training = training.concat(rainbows.training);
  training = training.concat(trains.training);

  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(trains.testing);

  // trainEpoch(training);
  // testAll(testing);

  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(function (){
    trainEpoch(training);
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });

  let testButton = select('#test');
  testButton.mousePressed(function (){
    let percent = testAll(testing);
    console.log("Accuracy percentage: " + nf(percent,2,2) + "%");
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function (){
    let inputs = [];
    let img = get();
    img.resize(28,28);
    img.loadPixels();
    for(let i = 0; i < len; i++){
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }

    let guess = nn.predict(inputs);
    let m = max(guess)
    let classification = guess.indexOf(m);
    if(classification === CAT){
      console.log("cat");
    } else if(classification === RAINBOW){
      console.log("rainbow");
    } else if(classification === TRAIN){
      console.log("train");
    }
  });

  let clearButton = select('#removeWhiteCanvas');
  clearButton.mousePressed(function(){
    background(255);
  });
}

function draw(){
  strokeWeight(8);
  stroke(0);
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function trainEpoch(training){
  shuffle(training, true);

  for(let i = 0; i < training.length; i++){
    let data = training[i];
    let inputs = Array.from(data).map(x => x / 255);

    let label = data.label;
    let targets = [0,0,0];
    targets[label] = 1;  
    nn.train(inputs,targets);
  }
}

function testAll(testing){
  let correct = 0;
  for(let i = 0; i < testing.length; i++){
    let data = testing[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = data.label;

    let guess = nn.predict(inputs);
    
    let m = max(guess)
    let classification = guess.indexOf(m);

    if(classification === label){
      correct++;
    }
  }
  let percent = 100 * (correct / testing.length);
  return percent;
}

function prepareData(category, data, label){
  category.training = [];
  category.testing = [];

  let threshold = floor(0.8 * total_data);
  for(let i = 0; i < total_data; i++){
    let offset = i * len;
    if(i < threshold){
      category.training[i] = data.bytes.subarray(offset, offset + len);
      category.training[i].label = label;
    } else{
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
      category.testing[i - threshold].label = label;
    }
  }
}