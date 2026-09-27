import { useEffect, useState } from "react";

function CalculatorButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`h-16 rounded-2xl text-xl font-semibold transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#b98b62] ${className}`}
    >
      {children}
    </button>
  );
}

function UserGuide() {
  return (
    <section className="mt-6 rounded-3xl border border-[#e6d7c5] bg-[#fffaf4] p-6 shadow-[0_10px_30px_rgba(82,57,38,0.08)]">
      <h2 className="mb-4 text-center text-xl font-bold text-[#5c4033]">
        How to Use
      </h2>

      <div className="space-y-3 text-sm leading-relaxed text-[#765f4d]">
        <p>
          <span className="font-bold text-[#a67c52]">1.</span>{" "}
          Enter numbers using the buttons or your keyboard.
        </p>

        <p>
          <span className="font-bold text-[#a67c52]">2.</span>{" "}
          Choose an operation such as +, −, ×, or ÷.
        </p>

        <p>
          <span className="font-bold text-[#a67c52]">3.</span>{" "}
          Press = to calculate or AC to reset.
        </p>

        <div className="mt-4 rounded-2xl bg-[#f3e8da] p-4">
          <p className="mb-2 font-semibold text-[#5c4033]">
            Supported Operations
          </p>

          <div className="grid grid-cols-2 gap-2 text-[#765f4d]">
            <span>+ Addition</span>
            <span>− Subtraction</span>
            <span>× Multiplication</span>
            <span>÷ Division</span>
          </div>
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
    <div className="rounded-[2rem] border border-[#e5d5c2] bg-[#fffaf4] p-5 shadow-[0_20px_45px_rgba(74,50,32,0.15)] sm:p-6">

      <div className="mb-5">
        <h1 className="text-center text-2xl font-bold text-[#5c4033]">
          DCIT 26 Calculator
        </h1>

        <p className="mt-1 text-center text-xs text-[#8a715d]">
          Application Development & Emerging Technologies
        </p>
      </div>

      <div className="mb-5 rounded-3xl bg-[#3f3028] p-5 shadow-inner">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c9ad91]">
            Display
          </span>

          {operator && (
            <span className="rounded-full bg-[#5b4639] px-3 py-1 text-xs font-semibold text-[#e8d5c1]">
              {operator}
            </span>
          )}
        </div>

        <div className="min-h-16 overflow-x-auto whitespace-nowrap text-right text-4xl font-bold text-[#fff8ef]">
          {display}
        </div>
        
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9a7b5d]">
          Calculator
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">

        <CalculatorButton
          onClick={clearCalculator}
          className="bg-[#c9946b] text-white"
        >
          AC
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("÷")}
          className="bg-[#eadbc9] text-[#654838]"
        >
          ÷
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("×")}
          className="bg-[#eadbc9] text-[#654838]"
        >
          ×
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("-")}
          className="bg-[#eadbc9] text-[#654838]"
        >
          −
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("7")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          7
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("8")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          8
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("9")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          9
        </CalculatorButton>

        <CalculatorButton
          onClick={() => chooseOperator("+")}
          className="row-span-2 bg-[#a67c52] text-white"
        >
          +
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("4")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          4
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("5")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          5
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("6")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          6
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("1")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          1
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("2")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          2
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("3")}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          3
        </CalculatorButton>

        <CalculatorButton
          onClick={performCalculation}
          className="row-span-2 bg-[#76513a] text-white"
        >
          =
        </CalculatorButton>

        <CalculatorButton
          onClick={() => inputNumber("0")}
          className="col-span-2 border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          0
        </CalculatorButton>

        <CalculatorButton
          onClick={inputDecimal}
          className="border border-[#eadfd1] bg-[#f8f1e8] text-[#5c4033]"
        >
          .
        </CalculatorButton>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#eadbc8] via-[#f3e8da] to-[#dfcbb5] px-4 py-8 sm:py-12">

      <div className="mx-auto w-full max-w-md">

        <Calculator />

        <UserGuide />

        <footer className="mt-6 text-center text-xs text-[#765f4d]">
          DCIT 26 • Laboratory 1 • SY 2026–2027
        </footer>

      </div>
    </main>
  );
}

export default App;