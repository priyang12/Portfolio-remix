import { bundleMDX } from "mdx-bundler";
import path from "path";
import fs from "fs";
import { cache } from "./Cache.server";
import rehypeSlug from "rehype-slug";

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
