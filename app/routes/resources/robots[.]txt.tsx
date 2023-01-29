export const loader = () => {
  const robotText = `
        User-agent: Googlebot
        Disallow: /nogooglebot/
    
        User-agent: *
        Allow: /
    
        Sitemap: https://www.web-club.co/resources/sitemap.xml
        `;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
