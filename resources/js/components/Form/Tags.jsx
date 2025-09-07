import { useFormContext } from "../../contexts/FormContext";

const Tags = () => {
  const { selectedCities, removeCity, cityColors, isIntroMode } =
    useFormContext();

  if (isIntroMode) return null;
  return (
    <div className="tags">
      {selectedCities.map((cityName, index) => {
        const cityColor = cityColors[cityName] || "#C9CBCF";
        return (
          <div
            key={`${cityName}-${index}`}
            className="tags__item"
            style={{
              borderColor: cityColor,
              backgroundColor: `${cityColor}60`,
            }}
          >
            <span className="tags__item-name">{cityName}</span>
            <button
              onClick={() => removeCity(cityName)}
              className="tags__item-remove"
              title="Remove city"
              style={{ color: cityColor }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
