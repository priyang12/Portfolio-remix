import type { LoaderFunction } from "@remix-run/node";

import { DomainName } from "~/DomainName";

export const loader: LoaderFunction = async () => {
  const content = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     <url>
        <loc>${DomainName}/projects/DevDairy</loc>
        <video:video>
            <video:title>Dev dairy is a web app that let's the user create project and create posts and work sessions to keep track of their projects. the user can also share the progress of the work where they have done with a link to show to other people. Priyang Patel Portfolio</video:title>
            <video:content_loc>
            https://ik.imagekit.io/5aalo5l7bu7/Portfolio/DevDairyVideo_bxgHRWRXN.mp4?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1672075666105
            </video:content_loc>
        </video:video>
     </url>
     <url>
        <loc>${DomainName}/projects/Ecommerce</loc>
        <video:video>
            <video:title>It's a full-stack web application that allows users to create an account, log in, and create an order. The application also allows users to view their order history, and view their cart. The application is built with Node.js, Express, MongoDB, React, Context API, and Styled Component. The application is deployed on Vercel. Priyang Patel Portfolio</video:title>
            <video:content_loc>
            https://ik.imagekit.io/5aalo5l7bu7/Portfolio/EcommerceClient_9av_ILt4v.mp4?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1668355268526
            </video:content_loc>
        </video:video>
     </url>
     <url>
        <loc>${DomainName}/projects/ReactLib</loc>
        <video:video>
            <video:title>It's a React Component Lib that follows Atomic Design Pattern to build UIs. Priyang Patel Portfolio</video:title>
            <video:content_loc>
            https://ik.imagekit.io/5aalo5l7bu7/Portfolio/React-lib_W7KdoRCay.mp4?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1672153476205
            </video:content_loc>
        </video:video>
     </url>
     <url>
        <loc>${DomainName}/projects/Tales</loc>
        <video:video>
            <video:title>It's a React PWA application that allows users to Find the Fun little Facts about the numbers using public api. Added Proxy-server for cross-origin. The application is deployed on Vercel. Priyang Patel Portfolio</video:title>
            <video:content_loc>
            https://ik.imagekit.io/5aalo5l7bu7/Portfolio/NumberFun_gk79SVdki.mp4?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1672083871657
            </video:content_loc>
        </video:video>
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
