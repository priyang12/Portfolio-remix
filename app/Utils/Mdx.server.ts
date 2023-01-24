import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import rehypeSlug from "rehype-slug";

import { cache } from "./Cache.server";

export { bundleMDX } from "mdx-bundler";

export const GetProjectList = () => {
  const CacheKey = "Projects";
  if (cache.has(CacheKey)) {
    return cache.get(CacheKey) as string[];
  } else {
    const _dirname = path.resolve();
    const ProjectsFileNames = fs.readdirSync(_dirname + "/content/Projects");
    cache.set(CacheKey, ProjectsFileNames, 60 * 60 * 24);
    return ProjectsFileNames;
  }
};

export const GetProject = async <T extends { [key: string]: unknown }>(
  name: string
) => {
  const CacheKey = "Project" + name;
  if (cache.has(CacheKey)) {
    return cache.get(CacheKey) as {
      frontmatter: T;
      code: string;
    };
  } else {
    const _dirname = path.resolve();
    const { frontmatter, code } = await bundleMDX<T>({
      file: _dirname + `/content/Projects/${name}`,
      cwd: process.cwd(),
      mdxOptions(options, frontmatter) {
        options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
        return options;
      },
    });
    cache.set(CacheKey, { frontmatter, code }, 60 * 60 * 24);
    return { frontmatter, code };
  }
};

export const GetAllBlogPostNames = async () => {
  const CacheKey = "Posts";
  if (cache.has(CacheKey)) {
    return cache.get(CacheKey) as string[];
  } else {
    const _dirname = path.resolve();
    const BlogFileNames = fs.readdirSync(_dirname + "/content/Blogs");
    cache.set(CacheKey, BlogFileNames, 60 * 60 * 24);
    return BlogFileNames;
  }
};

export const GetBlog = async <T extends { [key: string]: unknown }>(
  name: string
) => {
  const CacheKey = "Blogs/" + name;
  if (cache.has(CacheKey)) {
    return cache.get(CacheKey) as {
      frontmatter: T;
      code: string;
    };
  } else {
    const _dirname = path.resolve();
    const { frontmatter, code } = await bundleMDX<T>({
      file: _dirname + `/content/Blogs/${name}`,
      cwd: process.cwd(),
      mdxOptions(options, frontmatter) {
        options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
        return options;
      },
    });
    cache.set(CacheKey, { frontmatter, code }, 60 * 60 * 24);
    return { frontmatter, code };
  }
};

export const GetAllBlogs = async <T extends { [key: string]: unknown }>(
  BlogsNames: string[]
) => {
  const Data = [] as {
    frontmatter: T & { FileName: string };
    code: string;
  }[];

  const Blogs = async () => {
    for (let index = 0; index < BlogsNames.length; index++) {
      const Name = BlogsNames[index];
      const Blog = await GetBlog<T>(Name);
      Data.push({
        ...Blog,
        frontmatter: {
          ...Blog.frontmatter,
          FileName: path.parse(Name).name,
        },
      });
    }
  };
  await Blogs();

  return Data;
};
