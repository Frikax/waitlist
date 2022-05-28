import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const RightText = ({ children }) => {
  //Initiate AOS
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });
  return (
    <div
      className="bg-neutral-900 border-[1px] border-neutral-400 py-6 px-5 rounded-xl my-8"
      data-aos="fade-right"
    >
      <p className="text-left text-[13px] text-neutral-400 font-medium">
        {children}
      </p>
    </div>
  );
};

export default RightText;
