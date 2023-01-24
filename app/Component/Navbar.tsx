import { Link } from "@remix-run/react";
import { clsx } from "clsx";

import { useScroll } from "~/Hooks/useScroll";

function Navbar() {
  const { scrollDir } = useScroll();
  return (
    <div
      className={clsx(
        `glass-container navbar sticky top-0 left-0 z-20 flex-wrap rounded-b-md py-sm transition-transform sm:pr-xl lg:px-2xl`,
        scrollDir === "Down" ? "-translate-y-full" : "sticky"
      )}
    >
      <Link
        to="/"
        className="btn-ghost btn w-full text-center text-3xl normal-case sm:w-fit"
      >
        Priyang Patel
      </Link>
      <div className="flex-1"></div>

      <div className="w-full flex-none justify-center sm:w-fit sm:justify-end">
        <ul className="flex flex-col p-0 sm:flex-row">
          <li>
            <Link
              prefetch="intent"
              to="/Projects"
              className="btn-ghost btn p-3 text-xl normal-case"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              prefetch="intent"
              to="/Blogs"
              className="btn-ghost btn p-3 text-xl normal-case"
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              prefetch="intent"
              to="/FunZone"
              className="btn-ghost btn p-3 text-xl normal-case"
            >
              Fun-zone
            </Link>
          </li>
          <li>
            <Link
              prefetch="intent"
              to="/AboutMe"
              className="btn-ghost btn p-3 text-xl normal-case"
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
