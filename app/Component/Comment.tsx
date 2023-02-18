import * as React from "react";

const commentBox = React.createRef<HTMLDivElement>();

export function CommentComponent({ commentBox }: { commentBox: any }) {
  return <div ref={commentBox} />;
}

function Comment() {
  React.useEffect(() => {
    const commentScript = document.createElement("script");
    const theme = "preferred-color-scheme";
    commentScript.async = true;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("id", "utterances");
    commentScript.setAttribute("repo", "priyang12/Comments");
    commentScript.setAttribute("issue-term", "pathname");
    commentScript.setAttribute("theme", theme);
    commentScript.setAttribute("crossorigin", "anonymous");

    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript);
    } else {
      console.error(`Error adding utterances comments on: ${commentBox}`);
    }
  }, []);

  return (
    <div className="mx-md font-VT323 text-7xl">
      <h2>Comments</h2>
      {process.env.NODE_ENV === "production" ? (
        <CommentComponent commentBox={commentBox} />
      ) : null}
    </div>
  );
}

export default Comment;
