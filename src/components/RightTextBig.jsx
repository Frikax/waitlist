import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const RightTextBig = ({ children }) => {
  //Initiate AOS
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });
  return (
    <div
      className="bg-neutral-700  py-7 px-5 rounded-xl my-8"
      data-aos="fade-down"
    >
      <p className="text-left text-sm text-neutral-400 font-medium">
        {children}
      </p>
    </div>
  );
};

export default RightTextBig;
