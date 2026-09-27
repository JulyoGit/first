
import { useEffect, useState } from "react";

function CalculatorButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`h-16 rounded-xl text-xl font-semibold transition-all duration-150 active:scale-95 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#a67c52] ${className}`}
    >
      {children}
    </button>
  );
}

function UserGuide() {
  return (
    <section className="mt-8 rounded-2xl bg-[#fffaf2] p-6 shadow-[0_8px_25px_rgba(90,65,45,0.10)] border border-[#eadfce]">
      <h2 className="mb-4 text-xl font-bold text-[#5c4033] text-center">
        How to Use
      </h2>

      <div className="space-y-3 text-sm leading-relaxed text-[#765f4d]">
        <p>
          <strong className="text-[#5c4033]">1. </strong>{" "}
          Enter numbers using the buttons or your keyboard
        </p>

        <p>
          <strong className="text-[#5c4033]">2. </strong>{" "}
          Choose an operation (+, -, x, ÷)
        </p>

        <p>
          <strong className="text-[#5c4033]">3. </strong>{" "}
          Click = to calculate or AC to reset
        </p>

        <p>
          <strong className="text-[#5c4033]">4. Clear:</strong>{" "}
          Press AC to reset the calculator.
        </p>

        <p>
          <strong className="text-[#5c4033]">5. Keyboard:</strong>{" "}
          You can also use your keyboard to enter numbers and operations.
        </p>

        <div className="rounded-xl bg-[#f3eadc] p-4">
          <strong className="text-[#5c4033]">Supported Operations:</strong>

          <ul className="mt-2 list-inside list-disc text-[#765f4d]">
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

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

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

  const performCalculation = () => {
    if (
      firstNumber === null ||
      operator === null ||
      display === "Error"
    ) {
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

  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

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
    <div className="w-full max-w-md rounded-[2rem] bg-[#fffaf2] p-6 shadow-[0_15px_40px_rgba(76,55,38,0.18)] border border-[#eadfce]">
      <div className="mb-6 text-center">
        <div className="mb-2 text-3xl">☕</div>

        <h1 className="text-2xl font-bold text-[#5c4033]">
          DCIT 26 Calculator
        </h1>

        <p className="mt-1 text-sm text-[#8a715d]">
          Application Development and Emerging Technologies
        </p>
      </div>

      <div className="mb-5 rounded-2xl bg-[#f1e5d5] p-5 shadow-inner border border-[#e3d4c1]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#9a7b5d]">
          Output
        </p>

        <div className="min-h-12 overflow-x-auto text-right text-4xl font-bold text-[#4b3428]">
          {display}
        </div>

        {operator && firstNumber !== null && (
          <div className="mt-2 text-right text-sm text-[#8a715d]">
            {firstNumber} {operator}
          </div>
        )}
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9a7b5d]">
          Input & Operations
        </p>

        <div className="grid grid-cols-4 gap-3">
          <CalculatorButton
            onClick={clearCalculator}
            className="bg-[#c89f7b] text-white shadow-sm"
          >
            AC
          </CalculatorButton>

          <CalculatorButton
            onClick={() => chooseOperator("÷")}
            className="bg-[#e4d2bd] text-[#5c4033] shadow-sm"
          >
            ÷
          </CalculatorButton>

          <CalculatorButton
            onClick={() => chooseOperator("×")}
            className="bg-[#e4d2bd] text-[#5c4033] shadow-sm"
          >
            ×
          </CalculatorButton>

          <CalculatorButton
            onClick={() => chooseOperator("-")}
            className="bg-[#e4d2bd] text-[#5c4033] shadow-sm"
          >
            −
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("7")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            7
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("8")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            8
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("9")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            9
          </CalculatorButton>

          <CalculatorButton
            onClick={() => chooseOperator("+")}
            className="row-span-2 bg-[#a67c52] text-white shadow-md"
          >
            +
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("4")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            4
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("5")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            5
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("6")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            6
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("1")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            1
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("2")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            2
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("3")}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            3
          </CalculatorButton>

          <CalculatorButton
            onClick={performCalculation}
            className="row-span-2 bg-[#7b573f] text-white shadow-md"
          >
            =
          </CalculatorButton>

          <CalculatorButton
            onClick={() => inputNumber("0")}
            className="col-span-2 bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            0
          </CalculatorButton>

          <CalculatorButton
            onClick={inputDecimal}
            className="bg-[#f5eee5] text-[#5c4033] shadow-sm border border-[#e8dccd]"
          >
            .
          </CalculatorButton>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-[#eadbc8] px-4 py-10">
      <div className="mx-auto max-w-md">
        <Calculator />

        <UserGuide />

        <footer className="mt-6 text-center text-sm text-[#765f4d]">
          DCIT 26 • Laboratory 1 • SY 2026–2027
        </footer>
      </div>
    </main>
  );
}

export default App;
