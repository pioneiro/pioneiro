import React from "react";

import Logo from "../components/Logo";

const socialLinks = [
  {
    l: "https://github.com/pioneiro",
    i: <i className="fab fa-github"></i>,
  },
  {
    l: "https://linkedin.com/in/pioneiro",
    i: <i className="fab fa-linkedin-in"></i>,
  },
  {
    l: "https://instagram.com/o_pioneiro",
    i: <i className="fab fa-instagram"></i>,
  },
];

const Landing = () => {
  return (
    <header className="h-screen w-full bg-c0 text-c9 relative">
      <Logo className="h-2/3 absolute bottom-0 right-0 opacity-30" />
      <div className="text-3xl font-sacramento absolute top-1/4 left-1/4 transform -translate-x-1/4">
        <span>Hi, I'm </span>
        <span className="text-9xl font-inspiration">Soumyajit Das</span>
        <span>, a self taught MERN developer</span>
      </div>
      <div className="h-full py-6 absolute left-0 top-0 flex flex-col-reverse items-center gap-6 text-3xl">
        {socialLinks.map((e, i) => (
          <div
            key={i}
            className="relative px-6 group opacity-50 hover:opacity-80 transition-all"
          >
            <a href={e.l} target="_blank" rel="noreferrer">
              {e.i}
            </a>
            <div className="absolute left-1/2 w-0 group-hover:w-1/2 mt-2 h-0.5 rounded-lg bg-c9 transform -translate-x-1/2 transition-all"></div>
          </div>
        ))}
        <div className="h-full w-0.5 rounded-full bg-c8 opacity-50"></div>
      </div>
    </header>
  );
};

export default Landing;
