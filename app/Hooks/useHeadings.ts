import React from "react";

export function useHeadings() {
  const [headings, setHeadings] = React.useState<
    { id: string; text: string; level: number }[]
  >([]);

  React.useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h1,h2, h3, h4, h5, h6")
    )
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? "",
        level: Number(element.tagName.substring(1)),
      }));
    setHeadings(elements);
  }, []);

  return { headings };
}
