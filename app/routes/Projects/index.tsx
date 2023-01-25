import { FormControl, Input, Label, Ring } from "@priyang/react-component-lib";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Fetcher } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import path from "path";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

import ProjectCard from "~/Component/ProjectCard";
import Tags from "~/Component/Tags";
import { FilterProjects } from "~/Utils/Filter.server";
import { GetProject, GetProjectList } from "~/Utils/Mdx.server";

const DefaultTags = [
  "React",
  "Storybook",
  "Tailwind",
  "FULL-STACK",
  "FRONT-END",
  "MongoDB",
  "Node.js",
  "CSS modules",
];

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

  const Search = url.searchParams.get("search") || "";

  for (const filename in ProjectsFileNames) {
    const { frontmatter } = await GetProject<ProjectProps>(
      ProjectsFileNames[filename]
    );
    Projects.push({
      Data: frontmatter,
      filename: path.parse(ProjectsFileNames[filename]).name,
    });
  }

  const FilterProjectsList = FilterProjects(Projects, Search);

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
  const [SearchValue, setSearchValue] = useState(Search.get("search") || "");
  const [Projects, setProjects] = useState(FirstProjects);
  const [Page, setPage] = useState(1);
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    setProjects(FirstProjects);
  }, [FirstProjects]);

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
    fetcher.load(`/Projects?index&page=${Page + 1}`);
    setPage((page) => page + 1);
  };

  const SearchProject: React.ComponentPropsWithoutRef<"form">["onSubmit"] = (
    event
  ) => {
    event.preventDefault();
    const URL = new URLSearchParams(Search);
    if (SearchValue) URL.set("search", SearchValue);
    else URL.delete("search");
    useSearch(URL, {
      replace: true,
    });
    window.location.reload();
  };

  const ClearAll: React.ComponentPropsWithoutRef<"form">["onReset"] = (e) => {
    e.preventDefault();
    setSearchValue("");
    Search.delete("search");
    useSearch(Search, {
      replace: true,
    });
    window.location.reload();
  };

  const ClickTag = (TagName: string) => {
    setSearchValue(TagName);
    const URL = new URLSearchParams(Search);
    if (URL.has("search")) {
      const OldURL = URL.get("search");
      URL.set("search", OldURL + " " + TagName);
    } else {
      URL.set("search", TagName);
    }
    useSearch(URL, {
      replace: true,
    });
    window.location.reload();
  };

  const RemoveTag = (TagName: string) => {
    const NewValue = SearchValue.replace(TagName, "").trim();
    if (!NewValue) Search.delete("search");
    else Search.set("search", NewValue);

    setSearchValue(NewValue);
    useSearch(Search, {
      replace: true,
    });
    window.location.reload();
  };
  return (
    <section className="min-h-screen font-Roboto sm:px-xl" id="Projects">
      <h1 className="my-5 text-center font-VT323 text-7xl">Projects</h1>
      <div className="my-md flex flex-col md:flex-row">
        <Form
          className="flex flex-col justify-evenly gap-md"
          onSubmit={SearchProject}
          onReset={ClearAll}
        >
          <SearchComponent
            SearchValue={SearchValue}
            setSearchValue={setSearchValue}
          />

          <div className="btn-group">
            <input type="submit" value="Find me Project" className="btn" />
            <input type="reset" value="Clear" className="btn" />
          </div>
        </Form>
        <div className="divider lg:divider-horizontal" />
        <div className="mx-auto">
          <Tags
            Tags={DefaultTags}
            ClickTag={ClickTag}
            RemoveTag={RemoveTag}
            Search={Search.toString()}
          />
        </div>
      </div>

      <div className="mb-md flex flex-col gap-5">
        {Projects?.map((item) => (
          <ProjectCard
            Project={item.Data}
            Filename={item.filename}
            key={uuidv4()}
          />
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
  FetchMore: () => void;
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

function SearchComponent({
  SearchValue,
  setSearchValue,
}: {
  SearchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <FormControl>
      <Label htmlFor="query">Search Projects</Label>
      <Input
        id="query"
        type="text"
        InputSize="medium"
        value={SearchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        className="input-bordered input input-lg w-full max-w-xs text-white"
      />
      {SearchValue ? (
        <div
          className="absolute top-[64%] right-[5%] cursor-pointer text-white"
          tabIndex={0}
          onClick={() => {
            setSearchValue("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") setSearchValue("");
          }}
        >
          <AiOutlineClose />
        </div>
      ) : null}
    </FormControl>
  );
}
