import React, { useState } from "react";
import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every page load.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });
//  {r * 5 + c + 1}

function Game() {
  const [gameState, setGameState] = useState("");
  const [attempt, setAttempt] = useState(1);
  const [guess, setGuess] = useState("");
  const [allGuesses, setAllGuesses] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setGuess("");
    setAttempt(attempt + 1);
    setAllGuesses([...allGuesses, guess]);
    console.log(answer);
    checkWin();
  }

  function checkWin() {
    if (guess === answer) {
      setGameState("win");
    } else if (attempt === 6 && allGuesses[attempt - 1] !== answer) {
      setGameState("lose");
    }
  }

  return (
    <>
      {range(6).map((rows, r) => (
        <div key={r} className={`row  `}>
          {range(5).map((cols, c) => {
            const cellResult = checkGuess(allGuesses[r], answer);
            const cellStatus =
              cellResult && cellResult[c] ? cellResult[c].status : "";
            return (
              <div key={c} className={`cell ${cellStatus}`}>
                {allGuesses[r] && allGuesses[r][c] !== undefined
                  ? allGuesses[r][c]
                  : ""}
              </div>
            );
          })}
        </div>
      ))}
      <form className="guess-input-wrapper" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="guessInput" />
        <p>Guess: </p>
        <input
          id="guessInput"
          value={guess}
          maxLength={5}
          minLength={5}
          onChange={(e) => {
            setGuess(e.target.value.toUpperCase());
          }}
          disabled={gameState === "win" ? true : false}
        />
      </form>
      {gameState ? (
        <div className={`${gameState} banner`}>
          {gameState === "win" ? (
            <>
              <p>You Win! 🥳</p>
              <p>Guessed it in {attempt - 1} attempts</p>
            </>
          ) : (
            <>
              <p>You Lose ☹️</p>
              <p>Try Again!</p>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Game;
