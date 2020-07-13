import React, { useState, useEffect, useContext, useCallback } from "react";
import { PaletteContext } from "./theme/paletteContext";
import parsePalette from "./theme/parsePalette";
// import { GlobalStyles, themeColors } from "./GlobalStyle";
import { useSpring } from "react-spring";
import { MenuRight, MenuFull } from "./components/Menu";
import { library } from "@fortawesome/fontawesome-svg-core";
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
  context_id: 196313,
  palette: {
    colorOne: "#ffdecf",
    colorTwo: "#ba7967",
    colorThree: "#5e6f64",
    colorFour: "#3f4441",
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

  const pcont = useContext(PaletteContext);

  const setTheme = useCallback(
    (context_id) => {
      const c = parsePalette(
        pcont.palettes.find((pal) => pal.id === context_id)
      );
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
    [pcont.palettes, setAppTheme]
  );

  useEffect(() => {
    // const defaultPalette = 189688;
    // console.log(appTheme);
    const t = JSON.parse(appTheme);
    console.log(t);
    if (!t.context_id) {
      console.log(`setting theme to ${t}`);
      setTheme(t.context_id);
    }
  }, [appTheme, setTheme]);

  return (
    <div className="App">
      <PaletteContext.Provider>
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
            path="/theme"
            component={() => (
              <PalettePicker
                handleChangeTheme={setTheme}
                context={pcont}
                {...JSON.parse(appTheme)}
              />
            )}
          />
          <Route
            path="/projects"
            component={() => <Projects text="Projects" />}
          />
        </div>
      </PaletteContext.Provider>
    </div>
  );
}
