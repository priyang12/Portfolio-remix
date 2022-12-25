import type { ErrorBoundaryComponent, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import styles from "./styles/app.css";
import LibStyles from "@priyang/react-component-lib/dist/index.css";
import CustomErrorBoundary from "./Component/ErrorBoundary";

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

export default function App() {
  return (
    <html lang="en" data-theme="night" className="scroll-smooth">
      <head>
        <Meta />
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
      </head>

      <body
        style={{
          minHeight: "100vh",
        }}
      >
        <Navbar />
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
