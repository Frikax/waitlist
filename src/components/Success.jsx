import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Success = ({ text, visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 left-0 right-0 mx-auto w-[90vw] lg:w-2/6 bg-green-600 text-white text-sm py-5 px-6 rounded-xl drop-shadow-md"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Success;
