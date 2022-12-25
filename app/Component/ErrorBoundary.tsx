import { Button } from "@priyang/react-component-lib";
import React from "react";

export default function ErrorBoundary({ error }: any) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `url("https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80")
        repeat center/cover`,
      }}
    >
      <div className="glass-container p-2xl">
        <h1 className="text-5xl text-white">Something went Wrong hang on</h1>
        <Button className="mt-md" onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    </div>
  );
}
