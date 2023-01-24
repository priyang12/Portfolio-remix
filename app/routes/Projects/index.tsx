import { Ring } from "@priyang/react-component-lib";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Fetcher } from "@remix-run/react";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import path from "path";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ProjectCard from "~/Component/ProjectCard";
import VisibilityAnimation from "~/Component/VisibilitySensor";
import { FilterProjects } from "~/Utils/Filter.server";
import { GetProject, GetProjectList } from "~/Utils/Mdx.server";

export type ProjectProps = {
  Title: string;
  Description: string;
  TechName: string;
  GithubLink: string;
  ProjectLink: string;
  Image: string;
};

type LoaderType = {
  Data: ProjectProps;
  filename: string;
}[];

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const Page = Number(url.searchParams.get("page") || 1);
  const PerPage = 3;
  const Projects = [] as LoaderType;
  const ProjectsFileNames = GetProjectList();

  for (const filename in ProjectsFileNames) {
    const { frontmatter } = await GetProject<ProjectProps>(
      ProjectsFileNames[filename]
    );
    Projects.push({
      Data: frontmatter,
      filename: path.parse(ProjectsFileNames[filename]).name,
    });
  }

  const FilterProjectsList = FilterProjects(Projects, "");

  const PageProjects = FilterProjectsList.slice(
    PerPage * (Page - 1),
    Page * PerPage
  );

  return json({
    Projects: PageProjects,
    TotalProjects: FilterProjectsList.length,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data.TotalProjects) {
    return {
      title: "Missing Projects",
      description: `There is no Projects. 😢`,
    };
  }
  return {
    title: `Projects ${data.TotalProjects}`,
    description: "This is my Portfolio Projects",
  };
};

const ProjectsSections = () => {
  const { Projects: FirstProjects, TotalProjects } =
    useLoaderData<typeof loader>();
  const [Search, useSearch] = useSearchParams();
  const [Projects, setProjects] = useState(FirstProjects);
  const [Page, setPage] = useState(1);
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    if (Page > 1) {
      fetcher.load(`/Projects?index&page=${Page}`);
    }
  }, [Page]);

  console.log(fetcher.state);

  useEffect(() => {
    if (fetcher.data) {
      setProjects((CurrentProjects) => [
        ...CurrentProjects,
        // @ts-ignore
        ...fetcher.data?.Projects,
      ]);
    }
  }, [fetcher.data]);

  const FetchMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <section className="min-h-screen font-Roboto sm:px-xl" id="Projects">
      <h1 className="my-5 text-center font-VT323 text-7xl">Projects</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input-bordered input input-lg w-full max-w-xs"
      />

      <div className="mb-md flex flex-col gap-5">
        {Projects?.map((item) => (
          <VisibilityAnimation Duration={500} key={uuidv4()}>
            <ProjectCard Project={item.Data} Filename={item.filename} />
          </VisibilityAnimation>
        ))}
      </div>
      {TotalProjects !== Projects.length ? (
        <LoadMoreButton FetchMore={FetchMore} fetcher={fetcher} />
      ) : null}
    </section>
  );
};

export default ProjectsSections;

function LoadMoreButton({
  fetcher,
  FetchMore,
}: {
  fetcher: Fetcher;
  FetchMore: any;
}) {
  return (
    <Ring
      ringColor="#fff"
      OuterRingColor="#0f1729"
      onClick={FetchMore}
      className="btn-secondary btn my-md text-2xl sm:btn-block"
    >
      <button>{fetcher.state === "loading" ? "Loading" : "Load More"}</button>
    </Ring>
  );
}
