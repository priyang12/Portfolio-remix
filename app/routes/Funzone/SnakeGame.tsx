import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";

const createBoard = (BOARD_SIZE: number) => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

function Bored() {
  const Boxes = 10;
  const [board] = useState(createBoard(Boxes));
  const [snake, setSnake] = useState([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  const [direction, setDirection] = useState("down");
  const [food, setFood] = useState([0, 5]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      setDirection("up");
    } else if (e.key === "ArrowDown") {
      setDirection("down");
    } else if (e.key === "ArrowLeft") {
      setDirection("left");
    } else if (e.key === "ArrowRight") {
      setDirection("right");
    }
  };

  useEffect(() => {
    if (start) document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [start]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        if (start) {
          const newSnake = [...prevSnake];
          const [head, ...rest] = newSnake;
          const [newHead] = moveSnake(head, rest, direction);
          newSnake.unshift(newHead);
          // check if snake eats food
          if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setScore((prevScore) => prevScore + 1);
            const NewFood = [
              Math.floor(Math.random() * Boxes),
              Math.floor(Math.random() * Boxes),
            ];
            setSpeed((prevSpeed) => prevSpeed - 0.1);
            setFood(NewFood);
          } else {
            newSnake.pop();
          }
          // check if snake hits itself
          const snakeHead = newSnake[0];
          const snakeTail = newSnake.slice(1);
          if (
            snakeTail.some(
              (part) => part[0] === snakeHead[0] && part[1] === snakeHead[1]
            )
          ) {
            setGameOver(true);
          }
          return newSnake;
        }
        return prevSnake;
      });
    }, speed);
    if (gameOver) clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, [direction, speed, food, gameOver, start]);

  const moveSnake = (head: number[], rest: number[][], direction: string) => {
    switch (direction) {
      case "right":
        if (head[1] === Boxes) {
          return [[head[0], 0], ...rest];
        }
        return [[head[0], head[1] + 1], ...rest];
      case "left":
        if (head[1] === 0) {
          return [[head[0], Boxes], ...rest];
        }
        return [[head[0], head[1] - 1], ...rest];
      case "up":
        if (head[0] === 0) {
          return [[Boxes, head[1]], ...rest];
        }
        return [[head[0] - 1, head[1]], ...rest];
      case "down":
        if (head[0] === Boxes) {
          return [[0, head[1]], ...rest];
        }
        return [[head[0] + 1, head[1]], ...rest];
      default:
        return snake;
    }
  };
  const ResetGame = () => {
    setSnake([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
    setDirection("down");
    setFood([0, 5]);
    setScore(0);
    setSpeed(100);
    setGameOver(false);
  };

  return (
    <>
      <div className="flex flex-col justify-evenly md:flex-row">
        <div className="order-2 mx-md py-sm md:order-1">
          {board.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="flex flex-row justify-center">
                {row.map((col, colIndex) => {
                  const isSnake = snake.some(
                    (segment) =>
                      segment[0] === rowIndex && segment[1] === colIndex
                  );
                  const isFood = rowIndex === food[0] && colIndex === food[1];
                  return (
                    <div
                      key={colIndex}
                      className={`flex h-10 w-10 items-center justify-center border-2 border-primary ${
                        isSnake ? "bg-secondary" : isFood ? "bg-secondary" : ""
                      }`}
                    >
                      {isSnake ? "S" : isFood ? "F" : ""}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="order-1 mt-md md:order-2">
          <div className="text-center text-6xl">Score: {score}</div>
          {gameOver ? (
            <GameOver ResetGame={ResetGame} />
          ) : (
            <div className="my-sm flex flex-col items-center gap-5">
              <button
                className="btn btn-success btn-wide text-3xl"
                onClick={() => setStart(true)}
              >
                Start Game
              </button>
              <button
                className="btn btn-warning btn-wide text-3xl"
                onClick={() => setStart(false)}
              >
                Stop Game
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SettingDrawer({ children }: { children: React.ReactNode }) {
  return (
    <div className="-z-1 drawer drawer-end relative">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="btn drawer-button ml-auto mt-sm mr-xl flex w-fit"
        >
          <AiFillSetting />
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu w-80 overflow-y-auto bg-base-100 p-4 text-base-content">
          <li>
            <Link to="/Funzone">Fun Zone</Link>
          </li>
          <li>
            <h1>Select Player</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SnakeGame() {
  return (
    <SettingDrawer>
      <h1 className="text-center text-5xl">Snake Game</h1>
      <Bored />
    </SettingDrawer>
  );
}

export default SnakeGame;

function GameOver({ ResetGame }: { ResetGame: () => void }) {
  return (
    <div className="my-xl">
      <div className="text-center text-5xl">Game Over</div>
      <div className="text-center text-5xl">
        <button
          className="btn btn-outline btn-primary btn-wide"
          onClick={ResetGame}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
