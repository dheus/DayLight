import React, { useEffect } from "react";
import { useFormContext } from "../../contexts/FormContext";

const PopularCities = () => {
    const {
        isIntroMode,
        addCity,
        searchResults: filteredCities,
        searchLoading: cityLoading,
        initializePopularCities,
    } = useFormContext();

    useEffect(() => {
        if (isIntroMode) {
            initializePopularCities();
        }
    }, [isIntroMode, initializePopularCities]);

    const handleCitySelect = (city) => {
        addCity(city);
    };

    if (!isIntroMode) {
        return null;
    }

    return (
        <div className="popular-cities">
            <p className="popular-cities__title">Popular cities:</p>
            <div className="popular-cities__list">
                {filteredCities.length > 0 ? (
                    filteredCities.slice(0, 6).map((city) => (
                        <button
                            key={city}
                            type="button"
                            onClick={() => handleCitySelect(city)}
                            className="popular-cities__item"
                        >
                            {city}
                        </button>
                    ))
                ) : (
                    <div className="popular-cities__no-results">
                        No popular cities available
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularCities;
