import * as React from "react";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { redirect } from "react-router";
import { GetBlog } from "~/Utils/Mdx.server";
import readTime from "~/Utils/readTime";

export const loader = async ({ params }: LoaderArgs) => {
  const { Slug } = params;
  if (!Slug) return redirect("/Blogs");
  try {
    const { code, frontmatter } = await GetBlog<MdxPage["frontmatter"]>(
      `${Slug}.mdx`
    );

    return json({ frontmatter, code });
  } catch (error) {
    return redirect("/");
  }
};

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  if (!data) {
    return {
      title: "Missing Project",
      description: `There is no Project with the name of ${params.Slug}. 😢`,
    };
  }
  const { frontmatter } = data;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
};

export default function Blogs() {
  const { frontmatter, code } = useLoaderData<typeof loader>();

  const TotalTime = React.useCallback(() => readTime(code), []);
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="my-xl md:mx-2xl">
      <figure>
        <img
          src={frontmatter.ImageURL}
          loading="lazy"
          alt="Album"
          className="rounded-xl"
        />
      </figure>
      <h1 className="mx-2xl my-sm text-2xl">
        Total Read Time : {TotalTime()} Mins
      </h1>

      <article className="prose m-auto p-5 prose-h1:text-primary prose-h2:text-primary prose-img:rounded-3xl md:p-0 lg:prose-xl">
        <Component />
      </article>
    </div>
  );
}
