import { useState, useCallback } from "react";

const useAutocomplete = (autocompleteSuggestion) => {
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const handleInputChange = useCallback(
    (value, handleInputChange) => {
      handleInputChange(value);
      setShowAutocomplete(value.trim().length > 0 && autocompleteSuggestion);
    },
    [autocompleteSuggestion]
  );

  const acceptAutocomplete = useCallback(
    (handleInputChange) => {
      if (autocompleteSuggestion) {
        handleInputChange(autocompleteSuggestion);
        setShowAutocomplete(false);
      }
    },
    [autocompleteSuggestion]
  );

  const handleKeyDown = useCallback(
    (e, handleInputChange) => {
      if (e.key === "Tab" && autocompleteSuggestion && showAutocomplete) {
        e.preventDefault();
        acceptAutocomplete(handleInputChange);
      } else if (e.key === "Escape") {
        setShowAutocomplete(false);
      }
    },
    [autocompleteSuggestion, showAutocomplete, acceptAutocomplete]
  );

  return {
    showAutocomplete,
    handleInputChange,
    acceptAutocomplete,
    handleKeyDown,
  };
};

export default useAutocomplete;
