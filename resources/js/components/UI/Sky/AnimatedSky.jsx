import React from "react";
import Sun from "./Sun";
import Clouds from "./Clouds";
import "./AnimatedSky.scss";

const AnimatedSky = () => {
    return (
        <div className="animated-sky">
            <div className="sun-wrapper">
                <Sun />
            </div>
            <Clouds />
        </div>
    );
};

export default AnimatedSky;
