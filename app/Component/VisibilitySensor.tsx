import VisibilitySensor from "react-visibility-sensor";
import { Spring, animated } from "@react-spring/web";
import React, { useState } from "react";

export function VisibleElement({
  children,
}: {
  children: React.ReactElement<any>;
}) {
  const [Visible, setVisible] = useState(false);
  const onChange = (Visible: any) => {
    if (Visible) setVisible(true);
  };
  return (
    <VisibilitySensor
      partialVisibility
      offset={{ top: 100 }}
      onChange={onChange}
    >
      {React.cloneElement(children, {
        Visible,
      })}
    </VisibilitySensor>
  );
}

export const SpringHideShow = ({
  children,
  Duration,
  Visible,
}: {
  children: React.ReactElement<any>;
  Duration: number;
  Visible?: boolean;
}) => {
  return (
    <Spring delay={Duration} to={{ opacity: Visible ? 1 : 0 }}>
      {({ opacity }) => (
        <animated.div
          style={{
            opacity: opacity,
          }}
        >
          {children}
        </animated.div>
      )}
    </Spring>
  );
};

const VisibilityAnimation = ({
  Duration,
  children,
}: {
  Duration: number;
  children: React.ReactElement<any>;
}) => {
  return (
    <VisibleElement>
      <SpringHideShow Duration={Duration}>{children}</SpringHideShow>
    </VisibleElement>
  );
};

export default VisibilityAnimation;
