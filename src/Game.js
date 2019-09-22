import React from "react";

function Game(props) {
  let boxChoices = props.choices.map(choice => {
    return (
      <button className="btn btn-info mx-1" onClick={() => props.play(choice)}>
        {choice}
      </button>
    );
  });
  return <>{boxChoices}</>;
}

export default Game;
