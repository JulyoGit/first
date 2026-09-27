import { useEffect, useState } from "react";

// Reusable calculator button component
function CalculatorButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`h-16 rounded-xl text-xl font-semibold transition-all duration-150
        active:scale-95 hover:brightness-110 focus:outline-none focus:ring-2
        focus:ring-blue-400 ${className}`}
    >
      {children}
    </button>
  );
}

// User Guide component
function UserGuide() {
  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        📖 How to Use
      </h2>

      <div className="space-y-3 text-sm text-gray-600">
        <p>
          <strong>1. Enter numbers:</strong> Click the number buttons
          from 0–9.
        </p>

        <p>
          <strong>2. Choose an operation:</strong> Use +, −, ×, or ÷.
        </p>

        <p>
          <strong>3. Calculate:</strong> Press the = button to display
          the result.
        </p>

        <p>
          <strong>4. Clear:</strong> Press AC to reset the calculator.
        </p>

        <p>
          <strong>5. Keyboard:</strong> You can also use your keyboard
          to enter numbers and operations.
        </p>

        <div className="rounded-lg bg-gray-100 p-3">
          <strong>Supported Operations:</strong>
          <ul className="mt-2 list-inside list-disc">
            <li>Addition (+)</li>
            <li>Subtraction (−)</li>
            <li>Multiplication (×)</li>
            <li>Division (÷)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// Main calculator component
function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  // Perform the calculation
  const calculate = (first, second, operation) => {
    switch (operation) {
      case "+":
        return first + second;

      case "-":
        return first - second;

      case "×":
        return first * second;

      case "÷":
        if (second === 0) {
          return "Error";
        }
        return first / second;

      default:
        return second;
    }
  };

  // Handle number buttons
  const inputNumber = (number) => {
    if (display === "Error") {
      setDisplay(number);
      return;
    }

    if (waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  // Handle decimal point
  const inputDecimal = () => {
    if (display === "Error") {
      setDisplay("0.");
      return;
    }

    if (waitingForSecondNumber) {
      setDisplay("0.");
      setWaitingForSecondNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Handle operators
  const chooseOperator = (nextOperator) => {
    if (display === "Error") {
      return;
    }

    const inputValue = parseFloat(display);

    if (firstNumber === null) {
      setFirstNumber(inputValue);
    } else if (operator) {
      const result = calculate(firstNumber, inputValue, operator);

      if (result === "Error") {
        setDisplay("Error");
        setFirstNumber(null);
        setOperator(null);
        return;
      }

      setDisplay(String(result));
      setFirstNumber(result);
    }

    setOperator(nextOperator);
    setWaitingForSecondNumber(true);
  };

  // Handle equals button
  const performCalculation = () => {
    if (firstNumber === null || operator === null || display === "Error") {
      return;
    }

    const secondNumber = parseFloat(display);
    const result = calculate(firstNumber, secondNumber, operator);

    if (result === "Error") {
      setDisplay("Error");
    } else {
      setDisplay(String(result));
    }

    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(true);
  };

  // Clear calculator
  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key >= "0" && key <= "9") {
        inputNumber(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+") {
        chooseOperator("+");
      } else if (key === "-") {
        chooseOperator("-");
      } else if (key === "*") {
        chooseOperator("×");
      } else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
      } else if (key === "Enter" || key === "=") {
        performCalculation();
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        clearCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="w-full max-w-md rounded-3xl bg-gray-900 p-5 shadow-2xl">
      {/* Calculator header */}
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold text-white">
          DCIT 26 Calculator
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Application Development and Emerging Technologies
        </p>
      </div>

      {/* Display */}
      <div className="mb-5 rounded-2xl bg-gray-800 p-5 text-right">
        <div className="min-h-10 overflow-x-auto text-4xl font-bold text-white">
          {display}
        </div>

        {operator && firstNumber !== null && (
          <div className="mt-2 text-sm text-gray-400">
            {firstNumber} {operator}
          </div>
        )}
      </div>

      {/* Calculator buttons */}
      <div className="grid grid-cols-4 gap-3">
        <CalculatorButton
          onClick={clearCalculator}
          className="bg-red-500 text-white"
        >
          AC
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("÷")}
          className="bg-blue-500 text-white"
        >
          ÷
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("×")}
          className="bg-blue-500 text-white"
        >
          ×
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("-")}
          className="bg-blue-500 text-white"
        >
          −
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("7")}
          className="bg-gray-700 text-white"
        >
          7
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("8")}
          className="bg-gray-700 text-white"
        >
          8
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("9")}
          className="bg-gray-700 text-white"
        >
          9
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("+")}
          className="row-span-2 bg-blue-500 text-white"
        >
          +
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("4")}
          className="bg-gray-700 text-white"
        >
          4
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("5")}
          className="bg-gray-700 text-white"
        >
          5
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("6")}
          className="bg-gray-700 text-white"
        >
          6
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("1")}
          className="bg-gray-700 text-white"
        >
          1
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("2")}
          className="bg-gray-700 text-white"
        >
          2
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("3")}
          className="bg-gray-700 text-white"
        >
          3
        </CalculatorButton>

        <CalculatorButton
          onClick={performCalculation}
          className="row-span-2 bg-green-500 text-white"
        >
          =
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("0")}
          className="col-span-2 bg-gray-700 text-white"
        >
          0
        </CalculatorButton>

        <CalculatorButton
          onClick={inputDecimal}
          className="bg-gray-700 text-white"
        >
          .
        </CalculatorButton>
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-8">
      <div className="mx-auto max-w-md">
        <Calculator />
        <UserGuide />

        <footer className="mt-6 text-center text-sm text-gray-500">
          DCIT 26 • Laboratory 1 • SY 2026–2027
        </footer>
      </div>
    </main>
  );
}

export default App;