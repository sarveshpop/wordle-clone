import React, { useState } from "react";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessResults from "../GuessResults/GuessResults";
import GuessInput from "../GuessInput/GuessInput";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import Banner from "../Banner/Banner";
import { checkGuess } from "../../game-helpers";
import Keyboard from "../Keyboard/Keyboard";

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  const [gameState, setGameState] = useState("running"); // running | win | lose
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitGuess(currentGuess);
    setCurrentGuess("");
  }

  function handleSubmitGuess(currentGuess) {
    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    if (currentGuess === answer) {
      setGameState("win");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameState("lose");
    }
  }

  function handleRestart() {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
    setGuesses([]);
    setGameState("running");
  }

  const validatedGuesses = guesses.map((guess) => checkGuess(guess, answer));

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput
        gameState={gameState}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        handleSubmit={handleSubmit}
      />
      <Keyboard
        validatedGuesses={validatedGuesses}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        handleSubmit={handleSubmit}
      />
      {gameState !== "running" && (
        <Banner
          gameState={gameState}
          guesses={guesses}
          answer={answer}
          handleRestart={handleRestart}
        />
      )}
    </>
  );
}

export default Game;
