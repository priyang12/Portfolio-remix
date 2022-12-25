import { Ring } from "@priyang/react-component-lib";
import { json, LoaderArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { GetAllBlogPostNames, GetAllBlogs } from "~/Utils/Mdx.server";

export const loader = async ({}: LoaderArgs) => {
  const PostsFileName = await GetAllBlogPostNames();
  const Data = await GetAllBlogs<MdxPage["frontmatter"]>(PostsFileName);
  return json(Data.map((item) => item.frontmatter));
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data.length === 0) {
    return {
      title: "No Blogs",
      description: `There is no Blogs. 😢`,
    };
  }
  return {
    title: `Blogs ${data.length}`,
    description: "This is my Portfolio Blogs",
  };
};
export default function Index() {
  const Data = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen">
      <h1 className="my-5 text-center font-['cursive'] text-7xl">Blogs</h1>
      {Data.map((item) => (
        <div className="md:mx-2xl">
          <div className="card bg-base-100 shadow-xl lg:card-side">
            <figure>
              <img src={item.ImageURL} loading="lazy" alt="Album" />
            </figure>
            <div className="card-body border-2 border-solid border-primary-focus">
              <h2 className="card-title">{item.title}</h2>
              <p className="mt-5">{item.description}</p>
              <p>
                {item.date
                  ? format(parseISO(item.date), "yyyy-MM-dd' 'HH:mm")
                  : null}
              </p>
              <div className="card-actions justify-end">
                <Ring
                  ringColor="#fff"
                  OuterRingColor="#0f1729"
                  className="rounded-lg"
                >
                  <Link to={item.FileName}>
                    <button className="btn-primary btn">Read the Blog</button>
                  </Link>
                </Ring>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
