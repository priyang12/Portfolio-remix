import { Link } from "@remix-run/react";
import { useScroll } from "~/Hooks/useScroll";
import { clsx } from "clsx";

function Navbar() {
  const { scrollDir } = useScroll();
  return (
    <div
      className={clsx(
        `glass-container navbar py-sm sm:pr-xl lg:px-2xl sticky top-0 left-0 z-20 flex-wrap rounded-b-md transition-transform`,
        scrollDir === "Down" ? "-translate-y-full" : "sticky"
      )}
    >
      <Link
        to="/"
        className="btn btn-ghost w-full text-center text-3xl normal-case sm:w-fit"
      >
        Priyang Patel
      </Link>
      <div className="flex-1"></div>

      <div className="w-full flex-none justify-center sm:w-fit sm:justify-end">
        <ul className="xs:flex-row flex flex-col p-0">
          <li>
            <Link
              to="/Projects"
              className="btn btn-ghost p-3 text-xl normal-case"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/FunZone"
              className="btn btn-ghost p-3 text-xl normal-case"
            >
              Fun-zone
            </Link>
          </li>
          <li>
            <Link
              to="/AboutMe"
              className="btn btn-ghost p-3 text-xl normal-case"
            >
              About Me
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
