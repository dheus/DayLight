import React, { useState, useEffect } from "react";
import "./AnimatedSky.scss";

const Clouds = () => {
    const [cloudsVisible, setCloudsVisible] = useState(false);

    useEffect(() => {
        const cloudTimer = setTimeout(() => {
            setCloudsVisible(true);
        }, 10);

        return () => {
            clearTimeout(cloudTimer);
        };
    }, []);

    return (
        <>
            {/* Left Cloud */}
            <div
                className={`cloud-container left ${
                    cloudsVisible ? "visible" : ""
                }`}
            >
                <div className="cloud"></div>
            </div>

            {/* Right Cloud */}
            <div
                className={`cloud-container right ${
                    cloudsVisible ? "visible" : ""
                }`}
            >
                <div className="cloud"></div>
            </div>
        </>
    );
};

export default Clouds;
