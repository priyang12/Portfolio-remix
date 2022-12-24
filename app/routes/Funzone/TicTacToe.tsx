import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { AiFillSetting } from "react-icons/ai";

const Player = {
  X: "X",
  O: "O",
};

const GameStatus = {
  PLAYING: "PLAYING",
  DRAW: "DRAW",
  WIN: "WIN",
  [Player.X]: "X_WIN",
  [Player.O]: "O_WIN",
} as const;

type GameStatusType = typeof GameStatus[keyof typeof GameStatus];

const CheckWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // check if all squares are filled
  if (squares.every((square) => square !== "")) {
    return "draw";
  }
  return null;
};

let scores: any = {
  X: 1,
  O: -1,
  draw: 0,
};

function minmax(
  CurrentBored: string[],
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  player: "X" | "O",
  opponent: "X" | "O"
) {
  let result = CheckWinner(CurrentBored);
  if (result !== null) return scores[result];
  let bestScore = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < CurrentBored.length; i++) {
    if (CurrentBored[i] === "") {
      CurrentBored[i] = isMaximizing ? player : opponent;
      let score = minmax(
        CurrentBored,
        depth + 1,
        !isMaximizing,
        alpha,
        beta,
        player,
        opponent
      );
      CurrentBored[i] = "";
      bestScore = isMaximizing
        ? Math.max(score, bestScore)
        : Math.min(score, bestScore);

      if (isMaximizing && bestScore >= beta) {
        return bestScore;
      }
      if (!isMaximizing && bestScore <= alpha) {
        return bestScore;
      }
      alpha = isMaximizing
        ? Math.max(alpha, bestScore)
        : Math.min(alpha, bestScore);
    }
  }
  return bestScore;
}

function getBestMove(
  squares: string[],
  player: "X" | "O",
  opponent: "X" | "O"
): number {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === "") {
      squares[i] = player;
      let score = minmax(
        squares,
        0,
        false,
        -Infinity,
        Infinity,
        player,
        opponent
      );
      squares[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

const Square = ({ value, onClick }: { value: string; onClick: () => void }) => {
  return (
    <button
      className="h-32 w-32 sm:h-52 sm:w-52  text-4xl md:text-9xl btn border-primary border-2 border-solid hover:bg-secondary hover:text-white"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Modal = ({
  ModalRef,
  winner,
  Reset,
  gameStatus,
}: {
  ModalRef: any;
  winner: string | null;
  Reset: () => void;
  gameStatus: string;
}) => {
  return (
    <>
      <input
        type="checkbox"
        ref={ModalRef}
        id="my-modal-3"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={Reset}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex">
            <h1 className="text-2xl">
              {GameStatus[gameStatus] === "DRAW"
                ? "Ohh it is a draw"
                : `Winner is ${winner}`}
            </h1>
          </div>
          <h1 className="text-center my-sm">Choose your player</h1>
          <div className="flex justify-around">
            <button
              className="btn btn-primary text-4xl"
              onClick={() => {
                ModalRef.current.checked = false;
              }}
            >
              X
            </button>
            <button
              className="btn btn-secondary text-4xl"
              onClick={() => {
                ModalRef.current.checked = false;
              }}
            >
              O
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function SettingDrawer({
  setPlayer,
  player,
  Reset,
  children,
}: {
  setPlayer: (player: "X" | "O") => void;
  player: "X" | "O";
  Reset: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative -z-1 drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn flex w-fit ml-auto mt-sm mr-xl"
        >
          <AiFillSetting />
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link to="/Funzone">Fun Zone</Link>
          </li>
          <li>
            <h1>Select Player</h1>
            <div className="form-control">
              <label className="label w-full cursor-pointer">
                <span className="label-text">Red pill X</span>
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-red-500"
                  onChange={() => {
                    setPlayer("X");
                    Reset();
                  }}
                  checked={player === "X"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label w-full cursor-pointer">
                <span className="label-text">blue pill O</span>
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-blue-500"
                  onChange={() => {
                    setPlayer("O");
                    Reset();
                  }}
                  checked={player === "O"}
                />
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function TicTacToe() {
  const [Bored, setBored] = useState<string[]>(Array(9).fill(""));
  const [winner, setWinner] = useState<null | string>(null);
  const ModalRef = useRef<any>(null);
  const [gameStatus, setGameStatus] = useState<GameStatusType>(
    GameStatus.PLAYING
  );

  const [player, setPlayer] = useState<"O" | "X">("O");
  const opponent = player === "O" ? "X" : "O";

  useEffect(() => {
    setPlayer((localStorage.getItem("player") as any) || "O");
  }, []);

  useEffect(() => {
    const Move = getBestMove(Bored, opponent, player);
    if (Move !== -1) {
      const boredCopy = Bored.slice();
      boredCopy[Move] = Player[opponent];
      setBored(boredCopy);
    }
  }, [winner, player]);

  const handleClick = (i: number) => {
    const boredCopy = Bored.slice();
    if (winner || boredCopy[i]) {
      return;
    }
    boredCopy[i] = Player[player];
    setBored(boredCopy);
    const Checkwinner = CheckWinner(boredCopy);
    setWinner(Checkwinner);
    if (Checkwinner) {
      ModalRef.current.checked = true;
    }
    if (!Checkwinner) {
      const move = getBestMove(boredCopy, opponent, player);
      boredCopy[move] = Player[opponent];
      setBored(boredCopy);
      const winner = CheckWinner(boredCopy);
      setWinner(winner);
      if (winner) {
        setGameStatus(
          winner === "draw" ? GameStatus.DRAW : GameStatus.FINISHED
        );
        ModalRef.current.checked = true;
      }
    }
  };

  const Reset = () => {
    setBored(Array(9).fill(""));
    setWinner(null);
  };

  return (
    <>
      <SettingDrawer setPlayer={setPlayer} player={player} Reset={Reset}>
        <div className="flex justify-center">
          <div>
            <h1 className="text-5xl sm:text-9xl font-Roboto my-sm">
              TicTacToe
            </h1>
            <Modal
              ModalRef={ModalRef}
              gameStatus={gameStatus}
              Reset={Reset}
              winner={winner}
            />
            <div className="grid grid-cols-3 gap-5">
              {Bored.map((value, index) => (
                <Square
                  key={index}
                  value={value}
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </SettingDrawer>
    </>
  );
}
