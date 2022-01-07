import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import details from "./data/details.json";

import Home from "./pages/Home";

const toggle = {
  visible: { scale: [0, 1.25, 1] },
  click: { scale: 0.95 },
  hover: { scale: 1.15 },
};

const email = {
  visible: {
    scale: [0.9, 1.1, 0.9],
    rotateY: [0, 720],
    transition: {
      duration: 2,
      ease: "easeIn",
      repeat: Infinity,
    },
  },
  hover: { scale: 1, rotateY: 0 },
};

const App = () => {
  const [dark, setDark] = useState(
    localStorage.dark ? localStorage.dark === "true" : true
  );

  useEffect(() => {
    document.querySelector(
      "title"
    ).textContent = `${details.name} | ${details.role}`;
  }, []);

  useEffect(() => {
    if (dark === true) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.dark = dark;
  }, [dark]);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>

      <motion.button
        variants={toggle}
        animate="visible"
        tap="click"
        hover="hover"
        onClick={setDark.bind(this, !dark)}
        aria-label={dark ? "light" : "dark"}
        className="fixed bottom-0 lg:bottom-auto lg:top-0 right-0 m-4 px-2 text-2xl rounded-full aspect-square bg-shade-7 text-shade-4 dark:bg-shade-4 dark:text-shade-0 grid place-items-center"
      >
        <i className="far fa-moon"></i>
      </motion.button>

      <motion.button
        variants={email}
        animate="visible"
        whileHover="hover"
        aria-label="Say Hi!"
        onClick={window.open.bind(this, `mailto:${details.email}`)}
        className="fixed bottom-0 left-0 lg:left-auto lg:right-0 m-4 px-4 text-4xl rounded-full aspect-square bg-shade-7 text-shade-4 dark:bg-shade-4 dark:text-shade-0 grid place-items-center"
      >
        <i className="far fa-envelope"></i>
      </motion.button>
    </>
  );
};

export default App;
