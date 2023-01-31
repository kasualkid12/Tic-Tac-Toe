// grid baseplate
let grid = [];
let gridPosition = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// conditions to test if someone won the game
const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

// function to print the grid based on the values in the grid position array
function printGrid() {
  let gridLine = "\n";
  for (let i = 0; i < 9; i += 3) {
    gridLine += (grid[i] || gridPosition[i]) + " | ";
    gridLine += (grid[i + 1] || gridPosition[i + 1]) + " | ";
    gridLine += (grid[i + 2] || gridPosition[i + 2]) + "\n";
    gridLine += ("---------" + "\n");
  }
  console.log(gridLine);
  return grid;
}

// print this board first to show players what number they need to input to be in that position
printGrid()

// variables used to keep track of whos turn it is and what each player has selected
let playerXTurn = true
const playerXPicks = []

let playerOTurn = false
const playerOPicks = []

// function to prompt users, asking what position they want to take
function turn() {                                                      
  if (playerXTurn === true) {
    // prompt player 1 to pick their position
    let position = prompt("Player 1, pick a open position.")
    
    // check that the position they picked is available
    let testCase = false;

    while (!testCase) {
      gridPosition.forEach((el) => { 
        if (position === el) {
          testCase = true;
        }
      });
      if (!testCase) {
        position = prompt("Please pick an available position");
      }
    }

    // adds the players position to their array
    playerXPicks.push(Number(position));
    gridPosition[Number(position) - 1] = 'X';

    // switches whos turn it is
    playerXTurn = false;
    playerOTurn = true;

    // prints the updated grid
    printGrid();
    
  } else if (playerOTurn === true) {
      // prompt player 1 to pick their position
    let position = prompt("Player 2, pick an open position.")
    
    // check that the position they picked is available
    let testCase = false;

    while (!testCase) {
      gridPosition.forEach((el) => { 
        if (position === el) {
          testCase = true;
        }
      });
      if (!testCase) {
        position = prompt("Please pick an available position");
      }
    }

    // adds the players position to their array
    playerOPicks.push(Number(position));
    gridPosition[Number(position) - 1] = 'O';

    // switches whos turn it is
    playerXTurn = true;
    playerOTurn = false;

    // prints the updated grid
    printGrid();
  }
}



// conditionals for the while loop
let playerXWins = false;
let playerOWins = false;
let isDraw = false;
let turnCounter = 0;

// create function "win" that takes the array of either player as an argument, and compares that array to the "wins" array returning true if that player wins
function win(playerArr) {
  let winFound = winCombos.some(x => x.every((e, i) => playerArr.includes(e)));
  return winFound;
}

// create a function "draw" that returns true if there are no more moves to make
function draw() {
  if (turnCounter === 8) {
    return true;
  }
  turnCounter += 1;
  return false;
}


// create a while loop that will run until one player wins or there is a draw
while (!playerXWins && !playerOWins && !isDraw) {
  turn();
  playerXWins = win(playerXPicks);
  playerOWins = win(playerOPicks);
  isDraw = draw()
}

// print the winner based on what win condition is true
if (playerXWins) {
  console.log("Player X Wins!");
} else if (playerOWins) {
  console.log("Player O Wins!");
} else {
  console.log("It's a draw");
}