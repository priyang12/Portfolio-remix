import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { GetProject } from "~/Utils/Mdx.server";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export type LoaderData = {
  Title: string;
  Description: string;
  TechName: string;
  Technologies: string[];
  GithubLink: string;
  ProjectLink: string;
  Image: string;
  Video: string;
};

export const loader = async ({ params }: LoaderArgs) => {
  const { Slug } = params;

  if (!Slug) return redirect("/projects");
  try {
    const { code, frontmatter } = await GetProject<LoaderData>(`${Slug}.md`);

    return json(
      { frontmatter, code },
      { headers: { "cache-control": "max-age=3600" } }
    );
  } catch (error) {
    return redirect("/");
  }
};

export default function Project() {
  const { frontmatter, code } = useLoaderData<typeof loader>();

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="min-h-screen">
      <div className="my-md mx-5 flex justify-between font-bold text-primary sm:mx-sm md:mx-2xl">
        <h1 className="text-2xl md:text-8xl">{frontmatter.Title}</h1>
        <a
          href={frontmatter.GithubLink}
          target="_blank"
          className="btn-secondary btn text-white"
          rel="noreferrer"
        >
          <FiGithub />
        </a>
      </div>
      <div className="w-screen" id="Client Link">
        <video
          className="my-sm mx-auto w-[90%] rounded-xl sm:w-[70%]"
          poster={frontmatter.Image}
          controls
          preload="none"
        >
          Your browser does not support the &lt;video&gt; tag.
          <source src={frontmatter.Video} />
        </video>

        <div className="flex flex-col items-center justify-center gap-5 sm:m-5 sm:flex-row">
          <h1 className="text-3xl text-primary sm:text-center">Client Side</h1>
          <div className="flex gap-5">
            <a
              href={frontmatter.ProjectLink}
              target="_blank"
              className="btn-primary btn hover:text-white"
              rel="noreferrer"
            >
              <h2 id="Client Link">
                Client Link <FiExternalLink />
              </h2>
            </a>
          </div>
        </div>
      </div>

      <article className="prose m-auto p-5 prose-h1:text-primary prose-h2:text-primary prose-img:rounded-3xl md:p-0 lg:prose-xl">
        <Component />
      </article>
    </div>
  );
}
