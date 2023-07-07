import React from "react";

const GuessInput = ({
  gameState,
  currentGuess,
  setCurrentGuess,
  handleSubmit,
}) => {
  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guessInput">Guess:</label>
      <input
        id="guessInput"
        required
        disabled={gameState !== "running"}
        value={currentGuess}
        maxLength={5}
        minLength={5}
        pattern="[a-zA-Z]{5}"
        onChange={(e) => {
          setCurrentGuess(e.target.value.toUpperCase());
        }}
      />
    </form>
  );
};

export default GuessInput;
