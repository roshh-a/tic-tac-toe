import './App.css';
import { useState } from 'react';

//Square/child component
function Square({ value, onSquareClick }) {

  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  );
}
//parent component
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); //a boolean to keep track of player's turn

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); //copying the array
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares); //letting it know the state has been changed
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
        <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
        <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
        <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
        <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
        <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
        <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
      </div>
    </>
  );
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  }
}
export default function Game() { //top-level component 
  // const [xIsNext, setXIsNext] = useState(true); //a boolean to keep track of player's turn
  // const [history, setHistory] = useState([Array(9).fill(null)]);
  // const currentSquares = history[history.length - 1];
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
      <div className='game-info'>
        <ol></ol>
      </div>
    </div>
  )
}