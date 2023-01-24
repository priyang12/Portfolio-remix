import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import { GetProject } from "~/Utils/Mdx.server";

import TableContent from "../../Component/TableContent";

type ProjectType = {
  Title: string;
  Description: string;
  TechName: string;
  GithubLink: string;
  ProjectLink: string;
  ClientImage: string;
  ClientVideo: string;
  AdminImage: string;
  AdminVideo: string;
  AdminLink: string;
};

function TableDrawer({ children }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="drawer drawer-mobile drawer-end relative">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="btn-primary drawer-button btn absolute -top-5 right-5 flex items-end sm:hidden"
        >
          Table of Content
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <TableContent />
      </div>
    </div>
  );
}

export const loader = async (_: LoaderArgs) => {
  try {
    const { code, frontmatter } = await GetProject<ProjectType>("Ecommerce.md");
    return json(
      { frontmatter, code },
      { headers: { "cache-control": "max-age=3600" } }
    );
  } catch (error) {
    return redirect("/");
  }
};

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  if (!data) {
    return {
      title: "Missing Project",
      description: `There is no Project with the name of ECommerce. 😢`,
    };
  }
  const { frontmatter } = data;

  return {
    title: frontmatter.Title,
    description: frontmatter.Description,
  };
};
export default function Project() {
  const { frontmatter, code } = useLoaderData<typeof loader>();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="min-h-screen">
      <div className="my-md mx-5 flex justify-between font-bold text-primary sm:mx-sm md:mx-2xl">
        <h1 className="text-2xl md:text-5xl">{frontmatter.Title}</h1>
        <a
          href={frontmatter.GithubLink}
          target="_blank"
          className="btn-secondary btn text-white"
          rel="noreferrer"
        >
          <FiGithub />
        </a>
      </div>

      <TableDrawer>
        <div className="w-screen" id="Client Link">
          <video
            className="my-sm mx-auto w-[90%] rounded-xl sm:w-[70%]"
            poster={frontmatter.ClientImage}
            controls
            preload="none"
          >
            Your browser does not support the &lt;video&gt; tag.
            <source src={frontmatter.ClientVideo} />
          </video>

          <div className="flex flex-col items-center justify-center gap-5 sm:m-5 sm:flex-row">
            <h1 className="text-3xl text-primary sm:text-center">
              Client Side
            </h1>
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
        <div className="w-screen" id="Admin Link">
          <video
            className="my-sm mx-auto w-[90%] rounded-xl sm:w-[70%]"
            poster={frontmatter.AdminImage}
            controls
            preload="none"
          >
            Your browser does not support the &lt;video&gt; tag.
            <source src={frontmatter.AdminVideo} />
          </video>

          <div className="flex flex-col items-center justify-center gap-5 sm:m-5 sm:flex-row">
            <h1 className="text-3xl text-primary sm:text-center">Admin Side</h1>
            <div className="flex gap-5">
              <a
                href={frontmatter.AdminLink}
                target="_blank"
                className="btn-primary btn hover:text-white"
                rel="noreferrer"
              >
                <h2 id="Admin Link">
                  Admin Link <FiExternalLink />
                </h2>
              </a>
            </div>
          </div>
        </div>

        <article className="prose m-auto p-5 prose-h1:text-primary prose-h2:text-primary prose-img:rounded-3xl md:p-0 lg:prose-xl">
          <Component />
        </article>
      </TableDrawer>
    </div>
  );
}
