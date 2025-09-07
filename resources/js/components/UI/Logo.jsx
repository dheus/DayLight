import React from "react";
import { Link } from "react-router-dom";
import useCityStore from "../../stores/cityStore";

const Logo = () => {
  const resetCities = useCityStore((state) => state.resetCities);
  const siteName = import.meta.env.VITE_SITE_NAME;

  const handleLogoClick = () => {
    resetCities();
  };

  return (
    <Link
      to="/"
      data-text={siteName}
      className="logo"
      onClick={handleLogoClick}
    >
      {siteName}
    </Link>
  );
};

export default Logo;
