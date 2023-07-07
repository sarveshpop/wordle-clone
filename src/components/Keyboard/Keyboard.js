import React from "react";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

function getStatusByLetter(validatedGuesses) {
  const statusObj = {};
  validatedGuesses.forEach((guess) => {
    guess.forEach(({ letter, status }) => {
      statusObj[letter] = status;
    });
  });
  return statusObj;
}

const Keyboard = ({
  validatedGuesses,
  currentGuess,
  setCurrentGuess,
  handleSubmit,
}) => {
  let statusByLetter = getStatusByLetter(validatedGuesses);

  function handleKeyPress(e) {
    e.preventDefault();
    const key = e.target.innerText;
    if (key === "ENTER") {
      handleSubmit(e);
    } else if (currentGuess && key === "⌫") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (!currentGuess && key === "⌫") {
      return false;
    } else {
      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess ? currentGuess + key : key);
      }
      return false;
    }
  }
  return (
    <div className="keyboard">
      {ROWS.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((letter) => (
            <div
              key={letter}
              className={`letter ${statusByLetter[letter] || ""}`}
              onClick={(e) => handleKeyPress(e)}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
