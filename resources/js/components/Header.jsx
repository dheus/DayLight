import React from "react";
import DateBanner from "./UI/DateBanner";
import Logo from "./UI/Logo";
import AnimatedSky from "./UI/Sky/AnimatedSky";
import useCityStore from "../stores/cityStore";

const Header = () => {
  const isIntroMode = useCityStore((state) => state.isIntroMode());
  const siteTitle = import.meta.env.VITE_SITE_TITLE;

  return (
    <div className={`header ${isIntroMode ? "intro" : "in-use"}`}>
      {isIntroMode ? (
        <>
          <AnimatedSky />
          <Logo />
          <p className="header__title">{siteTitle}</p>
          <DateBanner />
        </>
      ) : (
        <Logo />
      )}
    </div>
  );
};

export default Header;
