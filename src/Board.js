import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let i = 0; i < ncols; i++){
      initialBoard.push([])
      for(let q = 0; q < nrows; q++){
        var random_boolean = Math.random() >= 0.5;
        initialBoard[i].push(random_boolean)
      }
    }
  return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // so we check if all pieces are false
    const f = board.every(row => row.every(cell => cell === false))
    return f
    console.log(f, ' inside haswon')
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
      
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          if(y + 1 < nrows) boardCopy[y + 1][x] = !boardCopy[y + 1][x];
          if(y - 1 >= 0) boardCopy[y - 1][x] = !boardCopy[y - 1][x];
          if(x + 1 < ncols) boardCopy[y][x + 1] = !boardCopy[y][x + 1];
          if(x - 1 >= 0) boardCopy[y][x - 1] = !boardCopy[y][x - 1];
        }
      };
      console.log(y,x)
    // TODO: Make a (deep) copy of the oldBoard
    const deepCopyBoard = JSON.parse(JSON.stringify(oldBoard))
      
    // TODO: in the copy, flip this cell and the cells around it
    flipCell(y,x, deepCopyBoard)

    // TODO: return the copy
    return deepCopyBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  const won = hasWon()
  if (won) return (<h1>You have won</h1>)
  // TODO

  // make table board
  // TODO
  return ( 
    <table>
      <tbody>
        {board.map((cellRow, y) =>  (<tr>{cellRow.map((cell, x) => <Cell key={`${y}-${x}`} coord={`${y}-${x}`} flipCellsAroundMe = {flipCellsAround} isLit = {cell}  />)}</tr>))}
        {/* {board.map((cellRow, y) =>  (<tr>{cellRow.map((cell, x) => ` /    ${x}-${y}   / `)}</tr>))} */}
      </tbody>
    </table>
    )
}

export default Board;
