import { Title, Description, Subtitle } from "../../content/Hero.json";
import { Github, Linkedin, Twitter } from "../../content/Socials.json";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Ring } from "@priyang/react-component-lib";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

const HeroContainer = () => {
  return (
    <section className="my-xl mt-md sm:px-md">
      <div className="px-sm md:m-sm md:mx-md">
        <div className="font-VT323">
          <h1 className="text-primary text-7xl">{Title}</h1>
          <h2 className="text-primary my-5 text-5xl">{Subtitle} 👋</h2>
          <p className="text-primary my-5 text-3xl">{Description}</p>
        </div>
        <div className="font-Roboto my-5 flex flex-col gap-5 sm:flex-row">
          <a href={Github}>
            <button className="btn btn-secondary w-full gap-2 hover:text-white">
              <FiGithub />
              Github
            </button>
          </a>
          <a href={Twitter}>
            <button className="btn btn-primary w-full gap-2 hover:text-white">
              <FiTwitter /> Twitter
            </button>
          </a>
          <a href={Linkedin}>
            <button className="btn btn-secondary w-full gap-2 hover:text-white">
              <FiLinkedin />
              Linkedin
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

type returnData = {
  ProjectsData: {
    Title: string;
    Description: string;
    FileName: string;
  }[];
};

function TopProjectSection({
  ProjectList,
}: {
  ProjectList: returnData["ProjectsData"];
}) {
  return (
    <div className="md:mx-xl">
      <div className="relative">
        <Ring
          ringColor="#fff"
          OuterRingColor="#0f1729"
          className="bg-primary px-sm text-secondary-content sm:py-sm md:px-md m-auto w-fit rounded-xl text-center text-3xl md:rounded-3xl"
        >
          <h1>Top of Projects</h1>
        </Ring>
        <Link
          className="link-accent top-0 right-0 underline sm:absolute"
          to="/projects"
        >
          Show All Projects
        </Link>
      </div>
      <ul className="menu rounded-box my-sm bg-base-100 w-full p-2">
        {ProjectList.map((project) => (
          <Link to={`Projects/${project.FileName}`} key={project.Title}>
            <li className="my-sm rounded-lg ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900">
              <div className="gap-md flex flex-col md:flex-row">
                <h2 className="text-2xl md:w-1/4">{project.Title}</h2>
                <div className="divider lg:divider-horizontal"></div>
                <p className="w-3/4 text-xl">{project.Description}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export const loader: LoaderFunction = async () => {
  const _dirname = path.resolve();

  const ProjectsFileName = fs.readdirSync(
    path.join(_dirname + `/content/Projects`)
  );

  const ProjectsData = ProjectsFileName.slice(0, 3).map((project) => {
    const data = fs.readFileSync(
      path.join(_dirname + `/content/Projects/${project}`),
      "utf-8"
    );
    const { data: frontmatter } = matter(data);
    return {
      ...frontmatter,
      Title: frontmatter.Title,
      Description: frontmatter.Description,
      FileName: path.parse(project).name,
    };
  });
  const Projects = ProjectsData.map((project) => {
    return {
      FileName: project.FileName,
      Title: project.Title,
      Description: project.Description,
    };
  }) as returnData["ProjectsData"];

  return json(Projects);
};

export default function Index() {
  const ProjectList = useLoaderData<returnData["ProjectsData"]>();

  return (
    <>
      <HeroContainer />
      <TopProjectSection ProjectList={ProjectList} />
    </>
  );
}
