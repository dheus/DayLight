import React, { useState, useEffect } from "react";
const DateBanner = () => {
    const [dateVisible, setDateVisible] = useState(false);

    useEffect(() => {
        const dateTimer = setTimeout(() => {
            setDateVisible(true);
        }, 200);

        return () => {
            clearTimeout(dateTimer);
        };
    }, []);

    return (
        <div className={`date ${dateVisible ? "visible" : ""}`}>
            {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
            })}
        </div>
    );
};
export default DateBanner;
