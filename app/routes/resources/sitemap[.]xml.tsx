import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const content = `
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://www.web-club.co/</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Projects</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Blogs</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/FunZone</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/AboutMe</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/projects</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Projects/DevDairy</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Projects/Ecommerce</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Projects/ReactLib</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/projects/DevDairy</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/projects/Ecommerce</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/projects/ReactLib</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Blogs/Background-and-gradient-blog</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Blogs/Background</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/FunZone/TicTacToe</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/FunZone/SnakeGame</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Funzone</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.51</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Funzone/TicTacToe</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.41</priority>
  </url>
  <url>
    <loc>https://www.web-club.co/Funzone/SnakeGame</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.41</priority>
  </url>
  </urlset>
    `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
