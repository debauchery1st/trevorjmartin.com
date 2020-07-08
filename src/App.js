import React, { useState } from "react";
import GlobalStyle from "./GlobalStyle";
import { useSpring } from "react-spring";
import { MenuRight, MenuFull } from "./components/Menu";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { free-brands-svg-icons } from "@fortawesome/fontawesome-free";
import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
// import { fab } from "@fortawesome/fontawesome-free"; //  all of the brand icons
import {
  faBars,
  faHome,
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"; //"check-square" and "coffee"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { Route } from "react-router-dom";
library.add(faHome, faArrowCircleLeft, faArrowCircleRight);

export default function App() {
  const [fullMenuVisible, setFullMenuVisible] = useState(false);
  const themeColors = {
    colorOne: "#7c3c21",
    colorTwo: "#ec823a",
    colorThree: "#f9c49a",
    colorFour: "#e8e4e1",
  };

  const fullMenuAnimation = useSpring({
    opacity: fullMenuVisible ? 1 : 0,
    transform: fullMenuVisible ? `translateY(0)` : `translateY(-100%)`,
  });

  return (
    <div className="App">
      <button
        className={`menu-button menu-button--full${
          fullMenuVisible ? " menu-button-active" : ""
        }`}
        onClick={() => setFullMenuVisible(!fullMenuVisible)}
      >
        {fullMenuVisible ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>

      <MenuRight />
      <MenuFull
        style={fullMenuAnimation}
        handleClick={() => setFullMenuVisible(!fullMenuVisible)}
      />
      <div className="page-container">
        <Route exact path="/" component={() => <Home text="Home" />} />
        <Route path="/about" component={() => <About text="About" />} />
        <Route
          path="/projects"
          component={() => <Projects text="Projects" />}
        />
        <GlobalStyle {...themeColors} />
      </div>
    </div>
  );
}
