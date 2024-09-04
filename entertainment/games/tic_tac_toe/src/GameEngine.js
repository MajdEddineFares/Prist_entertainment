import React, { createContext, useState } from "react";
import { AllBoards } from "./GameBoard";

export const GameContext = createContext();

export const GameEngine = function () {
  
  const takeTurn = function (board, box) {
    if (gameContext.boards[board][box] !== 0) {
      return;
    }

    if (gameContext.boards[board][9] !== 0) {
      return;
    }

    gameContext.boards[board][box] = gameContext.turn;
    gameContext.lastBoard = board;
    gameContext.lastBox = box;

    // check if the player wins the board
    const wonBoard = didWinBoard(gameContext.turn, gameContext.boards[board]);
    if (wonBoard) {
      console.log(`Player ${gameContext.turn} won board ${board}`);

      gameContext.boards[board][9] = gameContext.turn;

      // check if the player wins the game
      const wonGame = didWinGame(gameContext.turn);
      if (wonGame) {
        gameContext.winner = gameContext.turn;
      }
    }

    const isBoxOpen = (s) => {
      switch (s) {
        case 1:
        case 2:
          return false;
        default:
          return true;
      }
    };

    // reset state of available boxes
    setOpenBoxes(-1, isBoxOpen);

    if (gameContext.boards[box][9] === 0) {
      for (var h = 0; h < 9; h++) {
        if (isBoxOpen(gameContext.boards[box][h])) {
          gameContext.boards[box][h] = 0;
        }
      }
    } else {
      setOpenBoxes(0, isBoxOpen);
    }

    // change turns
    gameContext.turn = gameContext.turn === 2 ? 1 : 2;

    // update context
    setGameContext({ ...gameContext });
  };

  const setOpenBoxes = function (val, cond) {
    for (var h = 0; h < 9; h++) {
      for (var k = 0; k < 9; k++) {
        let s = gameContext.boards[h][k];
        if (cond(s)) {
          gameContext.boards[h][k] = val;
        }
      }
    }
  };

  const didWinBoard = function (player, board) {
    const winsCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const boxesOwned = board.reduce((acc, v) => {
      return (acc += v === player ? 1 : 0);
    }, 0);

    if (boxesOwned >= 5) return true;

    return winsCombinations.reduce((r, v) => {
      if (r) return true;
      return (
        board[v[0]] === player &&
        board[v[1]] === player &&
        board[v[2]] === player
      );
    }, false);
  };

  const didWinGame = function (player) {};

  const [gameContext, setGameContext] = useState({
    turn: 1,
    lastBoard: -1,
    lastBox: -1,
    winner: 0,
    boards: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    takeTurn
  });

  return (
    <GameContext.Provider value={gameContext}>
      <AllBoards></AllBoards>
    </GameContext.Provider>
  );
};
