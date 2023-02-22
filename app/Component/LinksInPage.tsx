import * as React from "react";
import { v4 as uuidv4 } from "uuid";

function LinksInPage({ id }: { id: string }) {
  const [Links, setLinks] = React.useState<{ name: string; Link: string }[]>(
    []
  );

  React.useEffect(() => {
    const elements = document.getElementById(id)?.querySelectorAll("a");
    if (elements) {
      const linksArray = [];
      for (let i = 0; i < elements.length; i++) {
        console.log(elements[i]);
        const Text = elements[i].textContent;
        const name = Text?.replace(/\s+/g, " ").trim();
        const Link = elements[i].href;
        linksArray.push({ name: name ? name : Link, Link });
      }
      setLinks(linksArray);
    }
  }, [id]);

  return (
    <div className="text-center">
      <h3>Links</h3>
      <ul className="text-1xl flex flex-col">
        {Links.length > 0 &&
          Links.map((item) => (
            <li className="my-1" key={item.name + uuidv4()}>
              <span>=&gt; </span>
              <a href={item.Link}>{item.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LinksInPage;
