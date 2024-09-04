import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameEngine";
import { AllBoxes } from "./GameBox";

export const AllBoards = function (props) {
  let boards = [];
  for (var board = 0; board < 9; board++) {
    boards.push(<GameBoard board={board} key={board} />);
  }
  return <div className="all-boards">{boards}</div>;
};

export const GameBoard = function (props) {
  const gameContext = useContext(GameContext);
  const [className, setClassName] = useState("gameboard");

  useEffect(() => {
    const gameOver = gameContext.winner !== 0;
    const boardState = gameContext.boards[props.board][9];
    const nextBoardState = () => {
      if (gameContext.boards[gameContext.lastBox] ?? [].length !== 10) {
        return 0;
      }
      return gameContext.boards[gameContext.lastBox][9];
    };
    //gameContext && gameContext.lastBox && gameContext.boards[gameContext.lastBox][9] !== undefined
    //  ? gameContext.boards[gameContext.lastBox][9]
    //  : 0;

    let c = "gameboard";

    if (
      props.board === gameContext.lastBox &&
      !gameOver &&
      nextBoardState() === 0
    ) {
      c += ` last`;
    } else if (boardState === 0 && nextBoardState() !== 0) {
      c += ` last`;
    }

    setClassName(c);
  }, [gameContext, props.board, props.box]);

  const boardState = gameContext.boards[props.board][9];

  const Winner = (props) => {
    let ret = null;
    switch (props.player) {
      case 1:
        ret = <i className="fas fa-times"></i>;
        break;
      case 2:
        ret = <i className="far fa-circle"></i>;
        break;
      default:
    }
    if (!ret) return null;

    return <div class="box-winner">{ret}</div>;
  };

  return (
    <div className={className}>
      {boardState ? (
        <Winner player={boardState} />
      ) : (
        <AllBoxes board={props.board}></AllBoxes>
      )}
    </div>
  );
};
