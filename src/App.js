import React, { useState, useEffect, useCallback } from "react";
import { Switch } from "react-router-dom";
import { useSpring } from "react-spring";
import { MenuLeft, MenuFull } from "./components/Menu";
import { library } from "@fortawesome/fontawesome-svg-core";

import palettes from "./theme/palettes.json";
import parsePalette from "./theme/parsePalette";

import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
import {
  faBars,
  faHome,
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"; //"check-square" and "coffee"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { Route } from "react-router-dom";
import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import PalettePicker from "./components/palettePicker";

library.add(faHome, faArrowCircleLeft, faArrowCircleRight);

const defaultTheme = JSON.stringify({
  context_id: 0,
  palette: {
    colorOne: "#7c3c21",
    colorTwo: "#ec823a",
    colorThree: "#f9c49a",
    colorFour: "#e8e4e1",
  },
});
export default function App() {
  // local storage
  const [appTheme, setAppTheme] = useStateWithLocalStorage(
    "theme",
    defaultTheme
  );
  // springs
  const [fullMenuVisible, setFullMenuVisible] = useState(false);
  const fullMenuAnimation = useSpring({
    opacity: fullMenuVisible ? 1 : 0,
    transform: fullMenuVisible ? `translateY(0)` : `translateY(-100%)`,
  });

  const setTheme = useCallback(
    (context_id) => {
      const c = parsePalette(palettes.find((pal) => pal.id === context_id));
      if (c) {
        setAppTheme(
          JSON.stringify({
            context_id,
            palette: c,
          })
        );
      }
      return true;
    },
    [setAppTheme]
  );

  useEffect(() => {
    const t = JSON.parse(appTheme);
    if (!t.context_id) {
      setTheme(t.context_id);
    }
  }, [appTheme, setTheme]);

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
      <MenuLeft {...JSON.parse(appTheme)} />
      <MenuFull
        {...JSON.parse(appTheme)}
        style={fullMenuAnimation}
        handleClick={() => setFullMenuVisible(!fullMenuVisible)}
      />
      <div className="page-container">
        <Switch>
          <Route
            path="/about"
            component={() => <About text="About" {...JSON.parse(appTheme)} />}
          />
          <Route
            path="/theme"
            component={() => (
              <PalettePicker
                handleChangeTheme={setTheme}
                context={{ palettes }}
                {...JSON.parse(appTheme)}
              />
            )}
          />
          <Route
            path="/projects"
            component={() => (
              <Projects text="Projects" {...JSON.parse(appTheme)} />
            )}
          />
          <Route
            exact
            path="/"
            component={() => <Home text="Home" {...JSON.parse(appTheme)} />}
          />
        </Switch>
      </div>
    </div>
  );
}
