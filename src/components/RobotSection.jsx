import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

export const RobotSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset * 0.1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="robot-spline-container"
      style={{
        height: "30vh",
        width: "10vw",
        transform: `translateY(${offsetY}px)`,
      }}
    >
      <main>
        <Spline
        className="absolute lg:top-0 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full "
         scene="https://prod.spline.design/eRfU-oGvcB4mJMx7/scene.splinecode" />
      </main>
    </div>
  );
};
