import React from "react";

const Banner = ({ gameState, guesses, answer, handleRestart }) => {
  const tries = guesses.length;
  return (
    <>
      <div className="banner-bg">
        <div className={`${gameState} banner`}>
          <strong>{gameState === "win" ? "You Win! 🥳" : "You Lose 🙁"}</strong>
          <strong>
            {gameState === "win"
              ? `Took you ${tries} guess${tries > 1 ? "es" : ""}`
              : ` the word was ${answer}`}
          </strong>

          <button onClick={handleRestart}>
            {gameState === "win" ? "Restart" : "Try Again"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
