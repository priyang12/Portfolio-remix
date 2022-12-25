import { Title, Description, Subtitle } from "../../content/Hero.json";
import { Github, Linkedin, Twitter } from "../../content/Socials.json";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Ring } from "@priyang/react-component-lib";
import { GetProjectList, GetProject } from "~/Utils/Mdx.server";
import { LoaderData } from "./Projects/$Slug";
import path from "path";

const HeroContainer = () => {
  return (
    <section className="my-xl mt-md sm:px-md">
      <div className="px-sm md:m-sm md:mx-md">
        <div className="font-VT323">
          <h1 className="text-7xl text-primary">{Title}</h1>
          <h2 className="my-5 text-5xl text-primary">{Subtitle} 👋</h2>
          <p className="my-5 text-3xl text-primary">{Description}</p>
        </div>
        <div className="my-5 flex flex-col gap-5 font-Roboto sm:flex-row">
          <a href={Github}>
            <button className="btn-secondary btn w-full gap-2 hover:text-white">
              <FiGithub />
              Github
            </button>
          </a>
          <a href={Twitter}>
            <button className="btn-primary btn w-full gap-2 hover:text-white">
              <FiTwitter /> Twitter
            </button>
          </a>
          <a href={Linkedin}>
            <button className="btn-secondary btn w-full gap-2 hover:text-white">
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
          className="m-auto w-fit rounded-xl bg-primary px-sm text-center text-3xl text-secondary-content sm:py-sm md:rounded-3xl md:px-md"
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
      <ul className="menu rounded-box my-sm w-full bg-base-100 p-2">
        {ProjectList.map((project) => (
          <Link to={`Projects/${project.FileName}`} key={project.Title}>
            <li className="my-sm rounded-lg ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900">
              <div className="flex flex-col gap-md md:flex-row">
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

export const meta: MetaFunction = () => {
  return {
    title: "Priyang Patel",
    description: "This is my Personal portfolio",
  };
};

export const loader: LoaderFunction = async () => {
  const ProjectsFileName = GetProjectList();
  const data = [] as any[];

  const GetProjects = async () => {
    for (let project in ProjectsFileName.slice(0, 3)) {
      const ProjectData = await GetProject<LoaderData>(
        ProjectsFileName[project]
      );
      data.push({
        ...ProjectData.frontmatter,
        FileName: path.parse(project).name,
      });
    }
  };
  await GetProjects();
  return json(data);
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
