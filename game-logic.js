var board_arr = createArray(7, 6);
var disc_size = 80;
var board_color, p1_color, p2_color, background_color;
var potential_winning_lines = createArray(4, 0);
var winning_lines = [];

var cur_player = 1;
var winner = false;

function setup() {
  var myCanvas = createCanvas(700, 700);
  myCanvas.parent('sketch');
  noStroke();
  smooth();
  ellipseMode(CORNER);

  //Makes the canvas background the same as the body
  background_color = select('body').style("background-color");
  background(background_color);

  // Customize colors 
  board_color = color('#444CEE');
  p1_color = color('#E4F34A');
  p2_color = color('#E81722');

  // New Game Button
  var new_game = createButton('New Game');
  new_game.parent('#new_game');
  new_game.mousePressed(newGame);

  drawMainBoard();
}

function drawMainBoard() {
  fill(board_color);
  rect(0, 100, width, height);
  drawHolesAndDiscs();
}

function drawHolesAndDiscs() {
  fill(background_color);
  for (var x=0;x<board_arr.length;x++) 
    for (var y=0;y<board_arr[0].length;y++) 
      ellipse(x*100 + 10, y*100+110, disc_size, disc_size);
}

function draw() {
  if (!winner)
    drawHoveringPiece();    
}

function drawHoveringPiece() {
  fill(background_color);
  rect(0, 0, width, 100);

  if (cur_player == 1)
    fill(p1_color);
  else
    fill(p2_color);

  if (mouseY<height)
    ellipse(Math.ceil(mouseX/100) * 100 - 90, 0, disc_size, disc_size);
}

function winnerDrawing() {
  fill(background_color);
  rect(0, 0, width, 100);

  if (cur_player == 1)
    fill(p1_color);
  else
    fill(p2_color);

  textAlign(CENTER);
  textSize(100);
  text("WINS", width/2 , 80);

  fill(0);
  for (var i=0;i<winning_lines.length;i++) {
    start = winning_lines[i][0];
    finish = winning_lines[i][winning_lines[i].length-1];
    strokeWeight(5);
    stroke(0);
    line(start[0]*100+50, start[1]*100+150, finish[0]*100+50, finish[1]*100+150);
  }
  noStroke();
}


function mouseClicked() {
  if (!winner && mouseY<height) {
    col = Math.ceil(mouseX/100)-1;
    
    // If this col has room drop disc
    if (!board_arr[col][0]) {
      dropDisc(col);
    }
  }
}

function dropDisc(col) {
  row = 0;
  while (row<board_arr[0].length && !board_arr[col][row])
    row++;
  row-=1;

  // Piece has found the bottom
  // Set it and draw it
  board_arr[col][row] = cur_player;
  drawDisc(col, row);
  checkForWin(col, row);
  switchPlayer();
}

function drawDisc(col, row, erase) {
  var erase = erase || false;

  if (!erase) {
    if (cur_player == 1)
      fill(p1_color);
    else
      fill(p2_color);
  } else
      fill(background_color);

  ellipse(col*100 + 10, row*100+110, disc_size, disc_size);
}


function checkForWin(col, row) {
  checkHorizontalWin(row);
  checkVerticalWin(col, row);
  checkDiagonalWin(col, row);

  for (var i=0;i<potential_winning_lines.length;i++) 
    if(potential_winning_lines[i].length >= 4) 
      winning_lines.push(potential_winning_lines[i]);

  potential_winning_lines = createArray(4, 0);

  if (winning_lines.length>0) {
    winner = true;
    winnerDrawing();
  }
}

function checkHorizontalWin(row) {
  // Left to right horizontal win check
  var streak = 0;
  for(var i=0;i<board_arr.length;i++) 
    if (board_arr[i][row] == cur_player) {
      potential_winning_lines[0].push([i, row]);
      streak++;
    } else if (streak >=4) {
      break;
    } else {
      streak = 0;
      potential_winning_lines[0] = [];
    }
}

function checkVerticalWin(col, row) {
  // Up to down vertical check
  // Since vertical wins have to be from top to bottom this logic is different
  for(var i=0;i<4;i++) 
    if (row+i<board_arr[0].length && board_arr[col][row+i] == cur_player) 
      potential_winning_lines[1].push([col, row+i]);
}

function checkDiagonalWin(col, row) {
  // Left to right down diagonal
  var streak = 0;
  for(var i=-board_arr.length+1;i<board_arr.length;i++) 
    if (row+i>=0 && col+i>=0 && row+i<board_arr[0].length && col+i<board_arr.length && board_arr[col+i][row+i] == cur_player) {
      potential_winning_lines[2].push([col+i, row+i]);
      streak++;
    } else if (streak >=4) {
      break;
    } else {
      streak = 0;
      potential_winning_lines[2] = [];
    }

  // Left to right up diagonal
  streak = 0;
  for(var i=-board_arr.length+1;i<board_arr.length;i++) 
    if (row-i>=0 && col+i>=0 && row+i<board_arr[0].length && col+i<board_arr.length && board_arr[col+i][row-i] == cur_player) {
      potential_winning_lines[3].push([col+i, row-i]);
      streak++;
    } else if (streak >=4) {
      break;
    } else {
      streak = 0;
      potential_winning_lines[3] = [];
    }
}

function switchPlayer() {
  if (cur_player == 1)
    cur_player = 2;
  else
    cur_player = 1;
}

// Restart all necessary variables
function newGame() {
  cur_player = 1;
  winner = false;
  winning_lines = [];
  drawMainBoard();
  board_arr = createArray(7, 6);
}

function createArray(length) {
  var arr = new Array(length || 0),
  i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}