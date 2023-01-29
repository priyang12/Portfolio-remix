import type { LoaderFunction } from "@remix-run/node";

import { DomainName } from "~/DomainName";

export const loader: LoaderFunction = async () => {
  const content = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
     <url>
        <loc>${DomainName}/Projects</loc>
        <image:image>
           <image:loc>https://ik.imagekit.io/5aalo5l7bu7/Portfolio/Screenshot_2022-12-25_at_1.37.41_AM_AH3s9zRSN.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1672075778397</image:loc>
           <image:title>Priyang Dev Dairy FULL-STACK MonoRepo</image:title>
           <image:caption>It's a Full-stack web application. The user can create project and create posts and Worksessions to keep track of their projects. the user can also share the progress of the work where they have done with a link to show to other people. there are other feature that can be explored.</image:caption>
        </image:image>
     </url>
     <url>
        <loc>${DomainName}/Projects</loc>
        <image:image>
           <image:loc>https://ik.imagekit.io/5aalo5l7bu7/Ecommerce_8WgWzew6o.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1660117461345</image:loc>
           <image:title>Priyang FULL-STACK MonoRepo ECommerce</image:title>
           <image:caption>It's a full-stack web application that allows users to create an account, log in, and create an order. The application also allows users to view their order history, and view their cart. The application is built with Node.js, Express, MongoDB, React, Context API, and Styled Component. The application is deployed on Vercel.</image:caption>
        </image:image>
     </url>
     <url>
        <loc>${DomainName}/Projects</loc>
        <image:image>
           <image:loc>https://ik.imagekit.io/5aalo5l7bu7/Portfolio/ReactComponentLib.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1675114083291</image:loc>
           <image:title>Priyang React Component Lib</image:title>
           <image:caption>It's a React Component Lib that follows Atomic Design Pattern to build UIs.</image:caption>
        </image:image>
     </url>
     <url>
        <loc>${DomainName}/Projects</loc>
        <image:image>
           <image:loc>https://ik.imagekit.io/5aalo5l7bu7/Tales_O1dWSddbd.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1660117461598</image:loc>
           <image:title>Priyang Tales of Numbers PWA</image:title>
           <image:caption>It's a React PWA application that allows users to Find the Fun little Facts about the numbers using public api. Added Proxy-server for cross-origin. The application is deployed on Vercel.</image:caption>
        </image:image>
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
