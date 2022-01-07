import Typed from "typed.js";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

import details from "../data/details.json";

const container = {
  hidden: { x: "-100vh", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, type: "spring", stiffness: 120 },
  },
};

const info = { hover: { y: -8 } };

const tag = {
  hidden: { x: "100vh", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 160 },
  },
  hover: { y: 12 },
};

const Landing = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: details.skills,
      showCursor: false,
      startDelay: 500,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 500,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="h-screen w-full lg:pl-32 bg-shade-4 dark:bg-shade-0 text-shade-6 dark:text-shade-4 flex flex-col justify-center items-center overflow-hidden">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-bold w-full px-8 md:w-4/5 flex flex-col gap-8"
      >
        <motion.p variants={info} whileHover="hover">
          Hi,
        </motion.p>
        <motion.p variants={info} whileHover="hover">
          I'm{" "}
          <span className="font-inspiration font-normal">{details.name}</span>,
        </motion.p>
        <motion.p variants={info} whileHover="hover">
          {details.role.toLowerCase()}
        </motion.p>
        <motion.p
          variants={tag}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="mt-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-shade-4 dark:text-shade-0 bg-shade-6 dark:bg-shade-4 font-semibold px-2 tracking-widest self-start"
        >
          I use <span ref={el}></span>
        </motion.p>
      </motion.h1>
    </div>
  );
};

export default Landing;
