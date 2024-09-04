import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "./GameEngine";

export const AllBoxes = function (props) {
  let boxes = [];
  for (var box = 0; box < 9; box++) {
    boxes.push(<GameBox board={props.board} box={box} key={box} />);
  }
  return <div className="all-boxes">{boxes}</div>;
};

export const GameBox = function (props) {
  const gameContext = useContext(GameContext);
  const [className, setClassName] = useState("gamebox");

  const Icon = function () {
    switch (gameContext.boards[props.board][props.box]) {
      case 1:
        return <i className="fas fa-times"></i>;
      case 2:
        return <i className="far fa-circle"></i>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const gameOver = gameContext.winner !== 0;
    const boxState = gameContext.boards[props.board][props.box];
    const boardState = gameContext.boards[props.board][9];
    const wasLast =
      gameContext.lastBoard === props.board &&
      gameContext.lastBox === props.box;

    console.log(gameOver, boxState, boardState);

    let c = "gamebox";

    if (boxState === 0 && boardState === 0 && !gameOver) {
      c += ` glow p${gameContext.turn}`;
    }

    if (wasLast) {
      c += " last";
    }

    setClassName(c);
  }, [gameContext, props.board, props.box]);

  return (
    <div
      className={className}
      onClick={() => gameContext.takeTurn(props.board, props.box)}
    >
      <Icon />
    </div>
  );
};
