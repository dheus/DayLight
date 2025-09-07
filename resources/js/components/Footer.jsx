import React, { useState, useEffect } from "react";
import clouds from "../../assets/img/clouds.png";
import useCityStore from "../stores/cityStore";

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const isIntroMode = useCityStore((state) => state.isIntroMode());

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (!isIntroMode) {
        return null;
    }

    return (
        <div
            className={`footer ${isVisible ? "animate-in" : ""}`}
            style={{
                backgroundImage: `url(${clouds})`,
            }}
        ></div>
    );
};
export default Footer;
