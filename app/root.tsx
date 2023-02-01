import { Partytown } from "@builder.io/partytown/react";
import LibStyles from "@priyang/react-component-lib/dist/index.css";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
  useTransition,
} from "@remix-run/react";
import * as React from "react";

import CustomErrorBoundary from "./Component/ErrorBoundary";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import { NotFound } from "./Component/NotFound";
import { DomainName } from "./DomainName";
import styles from "./styles/app.css";
import * as gtag from "./Utils/gtags.client";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Portfolio",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: LibStyles },
  ];
}

// we don't want to show the loading indicator on page load
let firstRender = true;

const LOADER_WORDS = [
  "loading",
  "checking cdn",
  "checking cache",
  "fetching from db",
  "compiling mdx",
  "updating cache",
  "transfer",
];

const ACTION_WORDS = [
  "packaging",
  "zapping",
  "validating",
  "processing",
  "calculating",
  "computing",
  "computering",
];

function PageLoadingMessage() {
  const transition = useTransition();
  const [words, setWords] = React.useState<Array<string>>([]);
  const [pendingPath, setPendingPath] = React.useState("");

  React.useEffect(() => {
    if (firstRender) return;
    if (transition.state === "idle") return;
    if (transition.state === "loading") setWords(LOADER_WORDS);
    if (transition.state === "submitting") setWords(ACTION_WORDS);

    const interval = setInterval(() => {
      setWords(([first, ...rest]) => [...rest, first] as Array<string>);
    }, 2000);

    return () => clearInterval(interval);
  }, [pendingPath, transition.state]);

  React.useEffect(() => {
    if (firstRender) return;
    if (transition.state === "idle") return;
    setPendingPath(transition.location.pathname);
  }, [transition]);

  React.useEffect(() => {
    firstRender = false;
  }, []);

  const action = words[0];

  return (
    <>
      {transition.state !== "idle" ? (
        <div className="glass-container fixed bottom-5 right-5 z-30 m-auto flex w-fit flex-col  items-center justify-center gap-sm rounded-3xl p-sm">
          <h1>{action}</h1>
          <progress className="progress w-56"></progress>
        </div>
      ) : null}
    </>
  );
}

export const loader = async () => {
  return json({ gaTrackingId: process.env.GA_TRACKING_ID });
};

let isMount = true;

export default function App() {
  let location = useLocation();
  let matches = useMatches();

  const { gaTrackingId } = useLoaderData<typeof loader>();

  React.useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  React.useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location, matches]);

  return (
    <html lang="en" data-theme="night" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#c34138" />
        <Partytown debug={true} forward={["dataLayer.push"]} />
        <Meta />
        <link rel="manifest" href="/resources/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <Links />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&family=VT323&display=swap"
          rel="stylesheet"
        ></link>

        <title>Welcome to WebHub</title>
        <meta name="title" content="Welcome to WebHub" />
        <meta name="description" content="This is my Personal portfolio." />
        <link rel="canonical" href={DomainName} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DomainName} />
        <meta property="og:title" content="Welcome to WebHub" />
        <meta
          property="og:description"
          content="This is my Personal portfolio."
        />
        <meta property="og:image" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={DomainName} />
        <meta property="twitter:title" content="Welcome to WebHub" />
        <meta
          property="twitter:description"
          content="This is my Personal portfolio."
        />
        <meta property="twitter:image" content=""></meta>
      </head>

      <body
        style={{
          minHeight: "100vh",
        }}
      >
        {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <>
            <script
              type="text/partytown"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              type="text/partytown"
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
            <script />
          </>
        )}
        <Navbar />
        <PageLoadingMessage />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: any) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <CustomErrorBoundary error={error} />
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <html>
      <head>
        <title>Page Not Found</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <PageLoadingMessage />
        <NotFound />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
