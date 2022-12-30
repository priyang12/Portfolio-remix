import { json, LoaderFunction } from "@remix-run/node";

export let loader: LoaderFunction = () => {
  return json(
    {
      short_name: "Portfolio",
      name: "Priyang Patel Portfolio",
      start_url: "/",
      display: "standalone",
      background_color: "#d3d7dd",
      theme_color: "#c34138",
      icons: [
        {
          src: "/icons/android-chrome-32x32.png",
          sizes: "32x32",
          type: "image/png",
          density: "1.0",
        },
        {
          src: "/icons/android-chrome-96x96.png",
          sizes: "96x96",
          type: "image/png",
          density: "2.0",
        },
        {
          src: "/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          density: "4.0",
        },
        {
          src: "/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          density: "4.0",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    }
  );
};
