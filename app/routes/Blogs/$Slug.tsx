import * as React from "react";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { json, redirect } from "react-router";
import { GetBlog } from "~/Utils/Mdx.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { Slug } = params;
  if (!Slug) return redirect("/Blogs");

  try {
    const { code, frontmatter } = await GetBlog<MdxPage["frontmatter"]>(
      `${Slug}.mdx`
    );
    return json(
      { frontmatter, code },
      { headers: { "cache-control": "max-age=3600" } }
    );
  } catch (error) {
    return redirect("/");
  }
};

export default function Blogs() {
  const { frontmatter, code } = useLoaderData<typeof loader>();

  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="mx-2xl my-xl">
      <figure>
        <img
          src={frontmatter.ImageURL}
          loading="lazy"
          alt="Album"
          className="rounded-xl"
        />
      </figure>
      <article className="prose m-auto p-5 prose-h1:text-primary prose-h2:text-primary prose-img:rounded-3xl md:p-0 lg:prose-xl">
        <Component />
      </article>
    </div>
  );
}
