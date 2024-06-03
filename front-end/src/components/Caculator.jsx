import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const calculateResult = () => {
    try {
      const result = eval(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (key >= "0" && key <= "9") {
      handleClick(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      handleClick(key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault(); // Prevent form submission if inside a form
      calculateResult();
    } else if (key === "Backspace") {
      setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
    } else if (key === "Escape") {
      clearDisplay();
    } else if (key === ".") {
      handleClick(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <input
          className="w-full mb-4 p-2 text-right text-2xl border border-gray-300 rounded"
          type="text"
          value={display}
          readOnly
        />
        <div className="grid grid-cols-4 gap-2">
          <button
            className="col-span-2 bg-red-500 text-white p-4 rounded"
            onClick={clearDisplay}
          >
            C
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("/")}
          >
            /
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("*")}
          >
            *
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("7")}
          >
            7
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("8")}
          >
            8
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("9")}
          >
            9
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("-")}
          >
            -
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("4")}
          >
            4
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("5")}
          >
            5
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("6")}
          >
            6
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("+")}
          >
            +
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("1")}
          >
            1
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("2")}
          >
            2
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick("3")}
          >
            3
          </button>
          <button
            className="row-span-2 bg-yellow-500 text-white p-4 rounded"
            onClick={calculateResult}
          >
            =
          </button>
          <button
            className="col-span-2 bg-gray-200 p-4 rounded"
            onClick={() => handleClick("0")}
          >
            0
          </button>
          <button
            className="bg-gray-200 p-4 rounded"
            onClick={() => handleClick(".")}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
