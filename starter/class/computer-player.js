const { grid } = require("./screen");

class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    let validMoves = [];
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(grid[i][j] === ' ') validMoves.push({row: i, col: j})
      }
    }
    return validMoves;
  }

  static randomMove(grid) {

    // Your code here
    let availableMoves = this.getValidMoves(grid);
    let randIdx = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randIdx];
  }

  static getWinningMoves(grid, symbol) {

    // Your code here
    let winningMoves = [];

    winningMoves.push(...this.checkRows(grid, symbol));
    winningMoves.push(...this.checkColumns(grid, symbol));
    winningMoves.push(...this.checkDiags(grid, symbol));


    return winningMoves;

  }


  static getSmartMove(grid, symbol) {

    // Your code here
    let winningMoves = this.getWinningMoves(grid, symbol);
    if (winningMoves.length > 0) { return winningMoves[0] }

    let blockMoves = this.getWinningMoves(grid, 'O');
    if (blockMoves.length > 0) { return blockMoves[0] }

    return this.randomMove(grid, symbol);

  }



  static checkRows(grid, symbol) {
    let winningSpaces = [];

    grid.forEach((row, i) => {
      let count = 0;
      let potentialWin = []

      row.forEach((col, j) => {
        if (col === symbol) {
          count++;
        } else if (col === ' ') {
          potentialWin.push({row: i, col: j});
        }
      });
      if(count === 2) { winningSpaces.push(...potentialWin) }
    });

    return winningSpaces;
  }

  static checkColumns(grid, symbol) {
    let transposedGrid = [];
    let winningMoves = [];

    grid.forEach((row, i) => {
      let newRow = [];
      row.forEach((col, j) => {
        newRow.push(grid[j][i]);
      });
      transposedGrid.push(newRow);
    });

    let tWinningMoves = this.checkRows(transposedGrid, symbol);
    tWinningMoves.forEach(el => {
      winningMoves.push({row: el.col, col: el.row});
    });
    return winningMoves;
  }

  static checkDiags(grid, symbol) {
    let leftRight = [grid[0][0], grid[1][1], grid[2][2]];
    let rightLeft = [grid[0][2], grid[1][1], grid[2][0]];
    let count = 0;
    let winningMoves = [];
    let potentialWin = [];

    leftRight.forEach((el, i) => {
      if(el === symbol) {
        count++;
      } else if (el === ' ') {
        potentialWin.push({row: i, col: i});
      }
    });

    if (count === 2) {
      winningMoves.push(...potentialWin);
    }
    count = 0;
    potentialWin = [];

    rightLeft.forEach((el, i) => {
      if (el === symbol) {
        count++;
      } else if (el === ' ') {
        if (i === 0) {
          potentialWin.push({row: i, col: 2});
        } else if (i === 1){
          potentialWin.push({row: i, col: i});
        } else if (i === 2){
          potentialWin.push({row: i, col: 0});
        }
      }
    });

    if (count === 2) {
      winningMoves.push(...potentialWin);
    }

    return winningMoves;
  }

}

module.exports = ComputerPlayer;
