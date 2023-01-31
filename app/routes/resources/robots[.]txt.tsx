import { DomainName } from "~/DomainName";

export const loader = () => {
  const robotText = `
        User-agent: Googlebot
        Disallow: /nogooglebot/
    
        User-agent: *
        Allow: /
    
        Sitemap: ${DomainName}/resources/sitemap.xml
        `;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
