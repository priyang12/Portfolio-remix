import { Ring } from "@priyang/react-component-lib";
import { clsx } from "clsx";
import * as React from "react";

type Div = React.ComponentPropsWithoutRef<"div">;

function Tags({
  Tags,
  Search,
  RemoveTag,
  ClickTag,
}: {
  Search: string;
  Tags: string[];
  RemoveTag: (arg: string) => void;
  ClickTag: (arg: string) => void;
} & Div) {
  return (
    <div className="mt-5 flex w-full flex-wrap gap-md">
      {Tags.map((item) => {
        const Selected = Search.match(item);
        return (
          <Ring
            onClick={() => {
              if (Selected) RemoveTag(item);
              else ClickTag(item);
            }}
            ringColor="#fff"
            OuterRingColor="#0f1729"
            className={clsx(
              "btn mx-auto w-[30%] gap-2 text-secondary-content md:w-[20%]",
              Selected ? "bg-secondary-focus" : "bg-secondary"
            )}
            key={item}
            tabIndex={0}
            role="button"
          >
            {item}
          </Ring>
        );
      })}
    </div>
  );
}

export default Tags;
