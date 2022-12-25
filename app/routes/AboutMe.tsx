import { MetaFunction } from "@remix-run/node";
import { VisibleElement } from "~/Component/VisibilitySensor";
import SignSvgIcon from "../Component/Sign";

export const meta: MetaFunction = () => {
  return {
    title: "About Me",
    description:
      "Information about my career and job. i also provides contact information",
  };
};

const AboutMe = () => {
  return (
    <section className="my-sm mb-xl px-sm font-Roboto sm:px-xl" id="About">
      <div className="flex flex-col md:mx-auto md:w-3/4">
        <h1 className="mb-5 text-5xl text-primary">About Me</h1>
        <p className="mt-sm text-3xl leading-10 text-secondary">
          I'm a software engineer with a passion for building products that
          people love.
        </p>
        <p className="mt-sm text-3xl leading-10 text-secondary">
          I have Graduated from Gujarat Technology University with degree in
          Computer Science from the University of with 8.2 CGPA.
        </p>
        <p className="mt-sm text-3xl leading-10 text-secondary">
          I have a strong passion for learning new things and I am always
          looking for new ways to improve my skills. Currently I am learning
          remix-run (Server-side), serverless Function.
        </p>
        <p className="mt-sm text-3xl leading-10 text-secondary">
          I am Currently looking for a Entry Level position in the field of web
          development in Frontend or FullStack.
        </p>
      </div>
      <div className="flex justify-end">
        <VisibleElement>
          <SignSvgIcon />
        </VisibleElement>
      </div>
    </section>
  );
};

export default AboutMe;
