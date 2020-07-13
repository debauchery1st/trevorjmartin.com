import React from "react";
// import { themeColors } from "../../GlobalStyle";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageRef from "../PageRef";
import "./home.css";
const Home = (props) => {
  return (
    <div className="home-page">
      <h1>
        <FontAwesomeIcon icon="home" alt="Home" />
      </h1>
      <FontAwesomeIcon icon={faCat} />
      {props.text}
      <div className="hello-world">
        <h1>Hello, I'm Trevor Martin.</h1>
        <h2>I'm a full stack web engineer</h2>
        <div className="hello-links">
          <PageRef
            name="projects"
            url="/projects"
            hoverColor={props.palette.colorTwo}
            normalColor={props.palette.colorOne}
            text="Why not peruse some open source projects I've worked on."
          />
          <PageRef
            name="about"
            url="/about"
            hoverColor={props.palette.colorTwo}
            normalColor={props.palette.colorOne}
            text="Or find out more about me."
          />
          <br />{" "}
          {/* why does the shadow above depend on some element being here? */}
        </div>
      </div>
    </div>
  );
};

export default Home;
