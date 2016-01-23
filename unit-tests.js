// Unit tests can be run on the console by calling runAllUnitTests()
// If no console.logs, all tests passed
function runAllUnitTests() {
  testHorizontalWin();
  testVerticalWin();
  testDiagonalWin();
  testMultipleWins();
  testDropping();
  testSwitchPlayer();
}

function testHorizontalWin() {
  newGame();
  dropDisc(0);
  dropDisc(0);
  dropDisc(1);
  dropDisc(0);
  dropDisc(2);
  dropDisc(0);
  dropDisc(3);

  if (!winner)
    console.log("Expected horizontal win");
}

function testVerticalWin() {
  newGame();
  dropDisc(0);
  dropDisc(1);
  dropDisc(0);
  dropDisc(1);
  dropDisc(0);
  dropDisc(1);
  dropDisc(0);

  if (!winner)
    console.log("Expected vertical win");
}

function testDiagonalWin() {
  newGame();
  dropDisc(0);
  dropDisc(1);
  dropDisc(1);
  dropDisc(2);
  dropDisc(6);
  dropDisc(2);
  dropDisc(2);
  dropDisc(3);
  dropDisc(3);
  dropDisc(3);
  dropDisc(3);

  if (!winner)
    console.log("Expected diagonal win");
}

function testMultipleWins() {
  newGame();
  dropDisc(1);
  dropDisc(4);
  dropDisc(5);
  dropDisc(2);
  dropDisc(2);
  dropDisc(3);
  dropDisc(4);
  dropDisc(0);
  dropDisc(4);
  dropDisc(1);
  dropDisc(2);
  dropDisc(6);
  dropDisc(1);
  dropDisc(5);
  dropDisc(5);
  dropDisc(5);
  dropDisc(5);
  dropDisc(1);
  dropDisc(1);
  dropDisc(0);
  dropDisc(2);
  dropDisc(6);
  dropDisc(4);
  dropDisc(3);
  dropDisc(3);

  if (!winner && winning_lines.length != 3)
    console.log("Expected multple ways win");

}

function testDropping() {
  newGame();
  dropDisc(0);

  if (board_arr[0][5] != 1)
    console.log("Expected dropped disc, disc not found");

  dropDisc(0);
  dropDisc(0);
  dropDisc(0);
  dropDisc(0);
  dropDisc(0);
  dropDisc(0);

  if (board_arr[0][0] != 2)
    console.log("Shouldn't overwrite disc on column overload");
}

function testSwitchPlayer() {
  newGame();
  switchPlayer();

  if (cur_player != 2)
    console.log("Expected current player to be player 2 but found player 1");

  switchPlayer(); 

  if (cur_player != 1)
    console.log("Expected current player to be player 1 but found player 2");

}