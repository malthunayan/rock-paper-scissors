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
    bestOufOf: 3,
    winner: 0
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
    if (
      (this.bestOufOf === 3 && this.playerScore === 2) ||
      (this.bestOutOf === 5 && this.playerScore === 3)
    ) {
      this.setState({ winner: 1 });
    } else if (
      (this.bestOufOf === 3 && this.computerScore === 2) ||
      (this.bestOutOf === 5 && this.computerScore === 3)
    ) {
      this.setState({ winner: -1 });
    }
  };
  play = playerChoice => {
    if (this.state.winner !== 0) {
      this.setState({ winner: 0 });
      this.setState({ playerScore: 0 });
      this.setState({ computerScore: 0 });
    }
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    this.setState({ computerChoice: computerChoice });
    this.scoring(playerChoice, computerChoice);
  };
  bestOutOf = selection => {
    this.setState({ best: selection });
  };
  display = () => {
    if (this.state.playerScore) {
      return (
        <>
          <p className="my-3">Computer's choice: {this.state.computerChoice}</p>
          <p>Your score: {this.state.playerScore}</p>
          <p>Computer's score: {this.state.computerScore}</p>
        </>
      );
    }
    if (this.state.winner === 1) {
      return (
        <>
          <b>YOU WIN!!</b>
        </>
      );
    } else if (this.state.winner === -1) {
      return (
        <>
          <b>YOU LOST!! :(</b>
        </>
      );
    }
  };
  render() {
    let playStyleChoice = best.map(style => {
      return (
        <option value={style} onChange={() => this.bestOutOf(style)}>
          {style}
        </option>
      );
    });
    return (
      <div className="container my-5 text-center">
        <h1>Rock, Paper, Scissors</h1>
        <h3>
          Play best out of:
          <select className="mx-2">{playStyleChoice}</select>
        </h3>
        <Game choices={choices} play={this.play} />
        {this.display()}
      </div>
    );
  }
}

export default App;
