import React, { useEffect, useState } from "react";
import "./AnimatedSky.scss";

const Sun = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`sun ${isVisible ? "visible" : ""}`}>
            <div className="ray_box">
                <div className="ray ray1"></div>
                <div className="ray ray2"></div>
                <div className="ray ray3"></div>
                <div className="ray ray4"></div>
                <div className="ray ray5"></div>
                <div className="ray ray6"></div>
                <div className="ray ray7"></div>
                <div className="ray ray8"></div>
                <div className="ray ray9"></div>
                <div className="ray ray10"></div>
            </div>
        </div>
    );
};

export default Sun;
