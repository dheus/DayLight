import React, { useRef, memo } from "react";
import SunIcon from "../UI/SunIcon";
import { useFormContext } from "../../contexts/FormContext";

const Form = () => {
    const inputRef = useRef(null);

    const {
        cityName,
        placeholder,
        buttonText,
        showAutocomplete,
        autocompleteSuggestion,
        isSubmitDisabled,
        isIntroMode,
        handleInputChange,
        handleKeyDown,
        handleSubmit,
    } = useFormContext();

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form__input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    value={cityName}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={`form__input ${isIntroMode ? "intro" : ""}`}
                />
                {showAutocomplete && autocompleteSuggestion && (
                    <div className="form__autocomplete">
                        {cityName}
                        <span className="form__autocomplete-suggestion">
                            {autocompleteSuggestion.slice(cityName.length)}
                        </span>
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`form__submit ${isIntroMode ? "intro" : ""}`}
            >
                {isIntroMode && <SunIcon />}
                <span>{buttonText}</span>
            </button>
        </form>
    );
};

export default memo(Form);
