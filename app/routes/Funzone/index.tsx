import { Link } from "@remix-run/react";

function index() {
  return (
    <div className="h-screen">
      <div className="h-full bg-black px-sm pt-sm sm:mx-2xl sm:px-xl">
        <h1 className="text-center text-6xl">Fun - Zone</h1>
        <div className="mt-sm flex  min-h-[50%] flex-col gap-5 rounded-lg border-2 border-solid border-primary p-sm text-2xl">
          <Link
            to="TicTacToe"
            className="rounded-md bg-primary p-2 text-secondary-content"
          >
            Tic tac Toe
          </Link>
          <Link
            to="SnakeGame"
            className="rounded-md bg-primary p-2 text-secondary-content"
          >
            Snake Game
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
