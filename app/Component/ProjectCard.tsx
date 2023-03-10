import { Link } from "@remix-run/react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import type { ProjectProps } from "../routes/Projects/index";

const ProjectCard = ({
  Project,
  Filename,
}: {
  Project: ProjectProps;
  Filename: string;
}) => {
  const { Title, Description, TechName, ProjectLink, GithubLink, Image } =
    Project;

  return (
    <>
      <article
        className="glass-container flex flex-col gap-xl p-5 md:flex-row"
        tabIndex={0}
      >
        <div className="card border-2 border-solid border-secondary bg-base-100 shadow-xl md:order-2 lg:card-side">
          <Link to={`/projects/${Filename}`} className="h-full">
            <figure className="full w-full align-top">
              <img
                src={Image}
                alt={Title + " Image"}
                className="h-full w-full rounded-md p-5"
              />
            </figure>
          </Link>
          <div className="card-body w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-primary">{Title}</h1>
            </div>
            <p className="cut-text">{Description}</p>
            <div className="flex gap-5">
              <a
                href={ProjectLink}
                target="_blank"
                aria-label={`${Title} Project Link`}
                className="btn btn-primary hover:text-white"
                rel="noreferrer"
              >
                <FiExternalLink />
              </a>
              <a
                href={GithubLink}
                target="_blank"
                aria-label={`${Title} Github Link`}
                className="btn btn-secondary  hover:text-white"
                rel="noreferrer"
              >
                <FiGithub />
              </a>
              <Link
                className="btn btn-ghost ml-sm truncate border-secondary"
                to={`/projects/${Filename}`}
              >
                Learn more about
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-secondary text-center text-4xl text-secondary-content md:order-1 md:rotate-180 md:[writing-mode:vertical-lr]">
          <span className="">{TechName}</span>
        </div>
      </article>
    </>
  );
};

export default ProjectCard;
