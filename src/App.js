import React, { Component } from "react";
import "./App.css";

// Components
import Game from "./Game";

const choices = ["Rock", "Paper", "Scissor"];
const best = [3, 5];
class App extends Component {
  state = {
    playerScore: 0,
    computerScore: 0,
    computerChoice: null,
    bestOutOf: 3
  };
  scoring = (playerChoice, computerChoice) => {
    const playerIndex = choices.indexOf(playerChoice);
    const computerIndex = choices.indexOf(computerChoice);
    let newPlayerScore = this.state.playerScore;
    let newComputerScore = this.state.computerScore;
    if (
      (playerIndex === 2 && computerIndex === 1) ||
      (playerIndex === 1 && computerIndex === 0) ||
      (playerIndex === 0 && computerIndex === 2)
    ) {
      newPlayerScore++;
    } else if (
      (playerIndex === 1 && computerIndex === 2) ||
      (playerIndex === 0 && computerIndex === 1) ||
      (playerIndex === 2 && computerIndex === 0)
    ) {
      newComputerScore++;
    }
    this.setState({ playerScore: newPlayerScore });
    this.setState({ computerScore: newComputerScore });
  };
  play = playerChoice => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    this.setState({ computerChoice: computerChoice });
    this.scoring(playerChoice, computerChoice);
  };
  bestOutOf = selection => {
    this.setState({ bestOutOf: Number(selection.target.value) });
  };
  display = () => {
    if (
      (this.state.bestOutOf === 3 && this.state.playerScore >= 2) ||
      (this.state.bestOutOf === 5 && this.state.playerScore >= 3)
    ) {
      return (
        <>
          <h1 className="my-3">YOU WIN!!</h1>
          <button
            className="btn btn-lg btn-danger"
            onClick={() => this.reset()}
          >
            Reset
          </button>
        </>
      );
    } else if (
      (this.state.bestOutOf === 3 && this.state.computerScore >= 2) ||
      (this.state.bestOutOf === 5 && this.state.computerScore >= 3)
    ) {
      return (
        <>
          <h1 className="my-3">YOU LOST!! :(</h1>
          <button
            className="btn btn-lg btn-danger"
            onClick={() => this.reset()}
          >
            Reset
          </button>
        </>
      );
    }
    if (this.state.computerChoice) {
      return (
        <>
          <p className="my-3">Computer's choice: {this.state.computerChoice}</p>
          <p>Your score: {this.state.playerScore}</p>
          <p>Computer's score: {this.state.computerScore}</p>
        </>
      );
    }
  };
  reset = () => {
    this.setState({ playerScore: 0, computerScore: 0 });
  };
  render() {
    let playStyleChoice = best.map(style => {
      return (
        <option value={style} key={style}>
          {style}
        </option>
      );
    });
    return (
      <div className="container my-5 text-center">
        <h1>Rock, Paper, Scissors</h1>
        <h3>
          Play best out of:
          <select className="mx-2" onChange={this.bestOutOf}>
            {playStyleChoice}
          </select>
        </h3>
        <Game choices={choices} play={this.play} />
        {this.display()}
      </div>
    );
  }
}

export default App;
