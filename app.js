var myCanvas;

// Using this makes it easier to switch between screens without typing out the screen name every time.
const ScreenTransitions = {
  HOMESCREEN: "home screen",
  TOPICSELECTION: "topic selection",
  GAMEPLAY: "gameplay",
  GAMEOVER: "game over",
  STATISTICS: "statistics",
};

var currentScreen = ScreenTransitions.HOMESCREEN;


// majority of variables use

let questions;
let questionMath;
let questionEcon;
let questionCompSci;
let currentQuestion;
let diceRoll;
let questionShown = false;
let answerOptions = [];
let answerCorIncor;
let ansResultTimer = 0;
let answerCor = 8;
let answerIncor = 9;

let examButton;
let defsButton
let homeButton

let questionType;

let xCoord;
let yCoord;
let boardCol;
let boardRow;

let gBoard = [];
let player;
let dice;
let snakes = {};
let ladders = {};

let backgroundColor = '#FFFFFF';

//found on stack overflow =>
document.addEventListener("DOMContentLoaded", () => {
  const colorInput = document.getElementById('colorInputColor');
  if (colorInput) {
    backgroundColor = colorInput.value;
    colorInput.addEventListener('input', () => {
      backgroundColor = colorInput.value;
    });
  }
});

function preload(){
    userImage = loadImage('shark.png',img =>{
      img.resize(60,60)
    });
    starImage = loadImage('star.png', img =>{
        img.resize(10,100)
    });
}

function setup() {
  myCanvas = createCanvas(1200, 700);
  console.log("Game has started.");

  // Set the starting screen to the home screen.
  currentScreen = ScreenTransitions.HOMESCREEN;

  // Create a new player with the color blue.
  player = new Player('blue',userImage);
  dice = new Dice(800,550,100);

  // Define the questions
  questionMath = [
    {
      question: "What is 2 + 2?",
      answers: ['3', '4', '5'],
      correctAnswer: '4'
    },
    {
      question: "what is 5 * 9",
      answers: ['45', '63', '40'],
      correctAnswer: '45'
    }
  ];

  questionCompSci = [
    {
      question: "what does CPU stand for?",
      answers: ["Controled proccesing Unit", 'Central Proccessing Unit', 'Central Programing Unit'],
      correctAnswer: "Central Proccessing Unit"
    },
    {
      question: "what does Decomposition do?",
      answers: ['break down a problem','remove usless parts','create a bigger picture'],
      correctAnswer: 'break down a problem'
    }
  ];

  questionEcon = [
    {
      question: "What does GDP mean?",
      answers: ['grand deposit profit', ' gross domestic profit', 'gross domestic product'],
      correctAnswer: 'gross domestic product'
    },
    {
      question: "what does HIC mean",
      answers: ['high income country', 'high independent currency', 'high income capita'],
      corAnswer: 'high income country'
    }
  ];


  //Hetre is where we define where the snakes are and what parts of the board they connect to.
  snakes = {
    18: 6,
    47: 26,
    49: 11,
    62: 19,
    64: 60,
    87: 24,
    91: 69,
    95: 81,
    98: 65
  };

// Here is where the ladders will be positioned similar to he snakes.
  ladders = {
    1: 38,
    7: 53,
    9: 31,
    43: 61,
    28: 84,
    36: 44,
    51: 67,
    71: 93,
    85: 94
  };
}

function draw() {
  switch (currentScreen) {
    case ScreenTransitions.HOMESCREEN:
      drawHomeScreen();
      break;
    case ScreenTransitions.TOPICSELECTION:
      drawTopicSelectionScreen();
      break;
    case ScreenTransitions.GAMEPLAY:
      drawGameplayScreen();
      break;
    // These screens are not yet implemented.
  
    case ScreenTransitions.GAMEOVER:
      drawGameOverScreen();
      break;
    /*
    case ScreenTransitions.STATISTICS:
      drawStatisticsScreen();
      break;
    */
    default:
      // If the screen is unknown, print an error message down to the console.
      console.error("Unknown screen: " + currentScreen);
  }
}

function drawHomeScreen() {
  //removes any previous elements.
  background(backgroundColor);
  removeElements();
  fill("black");
  textSize(90);
  textAlign(CENTER, CENTER);
  textFont('arial');
  text("REVISION", 210, 90);

// Subject Buttons
  mathsButton = createButton('Mathematics');
  mathsButton.position(10, 200);
  mathsButton.style('font-size', '40px');
  mathsButton.style('background-color', 'white');
  mathsButton.style('color', 'black');

  computerScienceButton = createButton('Computer Science');
  computerScienceButton.position(10, 275);
  computerScienceButton.style('font-size', '40px');
  computerScienceButton.style('background-color', 'white');
  computerScienceButton.style('color', 'black');

  economicsButton = createButton('Economics');
  economicsButton.position(10, 350);
  economicsButton.style('font-size', '40px');
  economicsButton.style('background-color', 'white');
  economicsButton.style('color', 'black');

  // When a button is pressed, change the screen to the topic selection screen but also make the subject the set of questions
  function econQuestType(){
    currentScreen = ScreenTransitions.TOPICSELECTION;
    questions = questionEcon;
  };
  function compSciQuestType() {
    currentScreen = ScreenTransitions.TOPICSELECTION;
    questions = questionCompSci;
  };
  function mathQestType() {;
    currentScreen = ScreenTransitions.TOPICSELECTION;
    questions = questionMath;
  };
  
  mathsButton.mousePressed(mathQestType);
  computerScienceButton.mousePressed(compSciQuestType);
  economicsButton.mousePressed(econQuestType);

}


// This function draws the topic selection screen.
function drawTopicSelectionScreen() {
  background(backgroundColor);
  removeElements();


 //Question Type Buttond
  examButton = createButton('Exam Questions');
  examButton.position(10, 200);
  examButton.style('font-size', '50px');

  defsButton = createButton('Definitions');
  defsButton.position(10, 300);
  defsButton.style('font-size', '50px');

 //home button
  homeButton = createButton('Home');
  homeButton.position(16,1000);
  homeButton.style('font-size','30px');
  homeButton.mousePressed(() => currentScreen = ScreenTransitions.HOMESCREEN);

// when a question type button is pressed the gae and revsion stars
  function examQests() {
    console.log("Exam Questions button pressed");
    removeElements();
    currentScreen = ScreenTransitions.GAMEPLAY;
  };
  function defsQuests() {
    console.log("Definitions button pressed");
    removeElements();
    currentScreen = ScreenTransitions.GAMEPLAY;
  };

  examButton.mousePressed(examQests);
  defsButton.mousePressed(defsQuests);
}


//creating the gameplay screen
function drawGameplayScreen() {
  background(backgroundColor);
  removeElements();
  
  if (ansResultTimer > 0 ) {
    fill('purple')
    rect(0, 0, width, height);
    answerCorIncor = (1200,700);
    ansResultTimer--;
    if (ansResultTimer === 0) {
        answerCorIncor = '';
    }
  }


  fill('#000000ff');
  textSize(26);
  textFont('Arial');
  textAlign(CENTER, CENTER);
  text("Test your knowledge", 540, 100);

 // creates game board
  drawboard();
  drawSnakesAndLadders();
  if (player ) {
    player.draw(userImage);
  }
  if (dice) {
    dice.draw();
  }

  if (questionShown !== false) {
    drawQuestion();
  }
}

// creates game board
function drawboard() {
  let tileCount = 1; // keeps count of how many square have been made so that the number in the cetral are correct
  
 //loops to create a 10*10 grid for the game board, help stack overflow: https://stackoverflow.com/questions/33745249/js-how-do-i-create-a-10x10-grid-of-filled-rectangles
  for (boardRow = 0; boardRow < 10; boardRow++) {
    for (boardCol = 0; boardCol < 10; boardCol++) {
      xCoord = 50 + ((boardRow % 2 === 0) ? boardCol * 50 : (9 - boardCol) * 50);
      yCoord = 650 - boardRow* 50 - 50;

      fill('white');
      stroke(0)
      rect(xCoord, yCoord, 50, 50);

      textSize(20);
      fill('black');
      textAlign(CENTER);
      text(tileCount, xCoord + 25, yCoord +  25);

      // where to draw the users player
      gBoard[tileCount] = { x: xCoord, y: yCoord };
      tileCount++;

       
    }
  }
}


// draws line representing snakes and ladders
function drawSnakesAndLadders() {
  strokeWeight(8);

// in the snake object find each of the enakes and draw them on
  for (let start in snakes) {
    let end = snakes[start];
    // Get the position of the start and end squares.
    let startPos = gBoard[start];
    let endPos = gBoard[end];

    // draws snakes and centres the start and end of the line in the centre of the tile
    stroke(255, 0, 0, 150);
    line(startPos.x + 20, startPos.y + 20, endPos.x + 20, endPos.y + 20);
  }

  //creates the ladders buy going through ladder object
  for (let start in ladders) {
    let end = ladders[start];
    let startPosition = gBoard[start];
    let endPosition = gBoard[end];

    //draw ladders
    stroke(0, 255, 0, 150);
    line(startPosition.x + 20, startPosition.y + 20, endPosition.x + 20, endPosition.y + 20);
  }
  strokeWeight(1);
}

// called whne mouse is clicked
function mousePressed() {
  if (currentScreen !== ScreenTransitions.GAMEPLAY || ansResultTimer > 0) {
    return;
  }

  if (questionShown) {
  answerOptions.forEach((AnswerBox, i) => {
    if (
      //check mouse is within the asnwers width and hight
      mouseX > AnswerBox.x && mouseX < AnswerBox.x + AnswerBox.w &&
      mouseY > AnswerBox.y && mouseY < AnswerBox.y + AnswerBox.h
    ) {
      checkAnswer(i);
      return;
    }
  });

} else if (
  mouseX > 800 && mouseX < 900 && 
  mouseY > 600 && mouseY < 700   
) {
  diceRoll = dice.roll();
  questionShown = true;
  currentQuestion = random(questions);
  }
}


function drawQuestion() {
  textSize(26);
  textFont('arial')
  textAlign(CENTER, CENTER);
  text(currentQuestion.question,820,240);

  
  answerOptions = [];
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    let answerY = 300 + i * 60;
    let answerBox = {
      x: 600,
      y: answerY,
      w: 500,
      h: 50
    };

  
    answerOptions.push(answerBox);
    fill(100);
    rect(600, answerY, 500, 50);
    fill(255);
    textSize(20);
    text(currentQuestion.answers[i], 800, answerY + 25);
  }
}

// ouput a signal to show i user got the aswer correct or incorrect
function checkAnswer(answer) {
  const selectedAnswer = currentQuestion.answers[answer];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    answerCorIncor = ('correct');
    answerCor++
    player.move(diceRoll);
  } else {
    answerCorIncor = ('Incorrect');
    answerIncor++
  }
  questionShown = false;
  ansResultTimer = 60; 
}

function drawGameOverScreen(){
  removeElements();
  background(backgroundColor);

  homeButton = createButton('Home');
  homeButton.position(16,1000);
  homeButton.style('font-size','30px');
  homeButton.mousePressed(() => currentScreen = ScreenTransitions.HOMESCREEN);

  textFont('arial');
  fill('black')
  textSize(90);
  text('Game Over',500,150);

  textFont('arial')
  fill('black')
  textSize(15)
  //text('Score :'+(answerCor/totalAnswers)*100,500,200);

  pieChart();
}

function pieChart(){
  let totalAnswers = answerCor + answerIncor;
  let angleCor = (answerCor/totalAnswers)*360;
  let anglePerc = (answerCor/totalAnswers)*100;
  let percent = Math.round(anglePerc) + '%';

  fill('red');
  ellipse(500,500, 300, 300);
  fill(0,133,9);
  arc(500, 500, 300, 300, 0, radians(angleCor));
  fill('white');
  ellipse(500,500,100,100);

  fill('black')
  textSize(25)
  text(percent,500,500);
  
}
