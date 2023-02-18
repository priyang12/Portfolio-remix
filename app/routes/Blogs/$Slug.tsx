import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import * as React from "react";
import { redirect } from "react-router";

import { GetBlog } from "~/Utils/Mdx.server";
import readTime from "~/Utils/readTime";

const Comment = React.lazy(() => import("~/Component/Comment"));

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
  const [CommentLoad, setCommentLoad] = React.useState(false);
  const { frontmatter, code } = useLoaderData<typeof loader>();
  const TotalTime = React.useCallback(() => readTime(code), [code]);
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  React.useEffect(() => {
    setCommentLoad(true);
  }, []);

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
      <div className="my-sm mx-md flex flex-col gap-5">
        <h1 className="text-6xl font-bold text-primary">{frontmatter.title}</h1>
        <h2 className="text-2xl">
          Total Read Time :{" "}
          <span className="font-bold text-secondary">{TotalTime()} Mins</span>
        </h2>
      </div>

      <article className="prose m-auto p-5 prose-h1:text-primary prose-h2:text-primary prose-img:mx-auto prose-img:rounded-3xl prose-video:mx-auto prose-video:w-full md:p-0 lg:prose-xl">
        <Component />
      </article>
      {CommentLoad ? (
        <React.Suspense
          fallback={
            <>
              <div>Loading</div>
            </>
          }
        >
          <Comment />
        </React.Suspense>
      ) : null}
    </div>
  );
}
