import { useHeadings } from "~/Hooks/useHeadings";

function TableContent() {
  const { headings } = useHeadings();
  return (
    <ul className="glass-container sticky top-0 left-0 ml-auto flex w-fit flex-col justify-center p-sm ">
      {headings.length > 0 &&
        headings.map((heading) => (
          <li
            className="my-1"
            key={heading.id}
            style={{
              marginLeft: `${heading.level - 2}em`,
            }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
    </ul>
  );
}

export default TableContent;
