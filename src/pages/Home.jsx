import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Landing from "../components/Landing";
import Logo from "../components/Logo";

import details from "../data/details.json";

const link = {
  hover: { scale: 1.1 },
  click: { scale: 0.9 },
};

const Home = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <aside
        className={`${
          menu ? "h-screen" : "h-28"
        } lg:h-screen w-full lg:w-32 bg-shade-5 dark:bg-shade-9 text-shade-7 dark:text-shade-4 text-center fixed top-0 left-0 flex flex-col-reverse justify-between z-10 transition-all lg:transition-none`}
      >
        <div className="h-24 lg:h-auto w-full px-2 lg:px-0 lg:py-4 bg-shade-4 dark:bg-shade-0 flex lg:flex-col justify-start lg:justify-center items-center group absolute top-0">
          <Link
            to="/"
            className="h-1/2 lg:h-auto lg:w-4/5 aspect-square mx-2 lg:mx-0 scale-95 group-hover:scale-105 transition"
          >
            <Logo />
          </Link>
          <div className="flex flex-col justify-center items-start lg:items-center">
            <p className="text-2xl font-semibold">{details.name}</p>
            <p className="text-base opacity-75 lg:mt-2">{details.role}</p>
          </div>

          <button
            onClick={setMenu.bind(this, !menu)}
            className="lg:hidden absolute right-4 text-2xl bg-shade-5 dark:bg-shade-9 text-shade-7 dark:text-shade-4 h-12 aspect-square grid place-items-center rounded-full"
          >
            <svg
              className={`h-2/3 mx-auto transition transform ${
                menu ? "rotate-90" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d={
                  menu
                    ? "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    : "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                }
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            menu ? "flex" : "hidden"
          } lg:flex justify-center items-center text-3xl lg:text-xl mb-8 lg:mb-24 text-shade-7 dark:text-shade-4`}
        >
          {details.socialLinks.map((e, i) => (
            <motion.a
              variants={link}
              whileHover="hover"
              whileTap="click"
              key={i}
              href={e.href}
              target="_blank"
              rel="noreferrer"
              aria-label={e.name}
              className="h-full aspect-square p-1.5 flex justify-center items-center rounded-full hover:bg-shade-7 hover:dark:bg-shade-4 hover:text-shade-5 hover:dark:text-shade-9 select-none"
            >
              <i className={e.iconClass}></i>
            </motion.a>
          ))}
        </div>
      </aside>
      <Landing />
    </>
  );
};

export default Home;
