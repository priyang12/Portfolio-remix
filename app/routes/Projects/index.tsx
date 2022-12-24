import { v4 as uuidv4 } from "uuid";
import path from "path";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { GetProject, GetProjectList } from "~/Utils/Mdx.server";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import VisibilityAnimation from "~/Component/VisibilitySensor";
import ProjectCard from "~/Component/ProjectCard";
import { Ring } from "@priyang/react-component-lib";

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

  const _dirname = path.resolve();
  const Projects = [] as LoaderType;
  const ProjectsFileNames = GetProjectList();
  // const TotalProjects = ProjectsFileNames.length;

  const PageProjects = ProjectsFileNames.slice(
    PerPage * (Page - 1),
    Page * PerPage
  );

  for (const filename in PageProjects) {
    const { frontmatter } = await GetProject<ProjectProps>(
      PageProjects[filename]
    );
    Projects.push({
      Data: frontmatter,
      filename: path.parse(PageProjects[filename]).name,
    });
  }

  return json(Projects, {
    status: 202,
    headers: {
      "cache-control": "max-age=3600",
      // "x-total-count": `${TotalProjects}`,
    },
  });
};

const ProjectsSections = () => {
  const FirstProjects = useLoaderData<typeof loader>();
  const [Projects, setProjects] = useState(FirstProjects);
  const [Page, setPage] = useState(1);
  const [LoadMore, setLoadMore] = useState(true);
  const fetcher = useFetcher();

  useEffect(() => {
    if (Page > 1) {
      fetcher.load(`/projects?index&page=${Page}`);
    }
  }, [Page]);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.length > 0) {
        setProjects((CurrentProjects) => [...CurrentProjects, ...fetcher.data]);
      }
      if (fetcher.data.length < 3) {
        setLoadMore(false);
      }
    }
  }, [fetcher.data]);

  const FetchMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <section className="min-h-screen font-Roboto sm:px-xl" id="Projects">
      <h1 className="my-5 text-center font-VT323 text-7xl">Projects</h1>

      <div className="mb-md flex flex-col gap-5">
        {Projects?.map((item) => (
          <VisibilityAnimation Duration={500} key={uuidv4()}>
            <ProjectCard Project={item.Data} Filename={item.filename} />
          </VisibilityAnimation>
        ))}
      </div>
      {LoadMore ? (
        <Ring
          ringColor="#fff"
          OuterRingColor="#0f1729"
          onClick={FetchMore}
          className="btn-secondary btn my-md text-2xl sm:btn-block"
        >
          <button>
            {fetcher.state === "loading" ? "Loading" : "Load More"}
          </button>
        </Ring>
      ) : null}
    </section>
  );
};

export default ProjectsSections;
