import { useCallback, useMemo } from "react";
import useFormStore from "../stores/formStore";
import useCityStore from "../stores/cityStore";
import useChartStore from "../stores/chartStore";
import useNotificationStore from "../stores/notificationStore";
import useAutocomplete from "./useAutocomplete";
import useErrorHandling from "./useErrorHandling";
import useChartSync from "./useChartSync";

const useForm = () => {
  const formStore = useFormStore();
  const cityStore = useCityStore();
  const chartStore = useChartStore();
  const notificationStore = useNotificationStore();

  useErrorHandling(formStore.searchError, chartStore.chartError);
  useChartSync(cityStore.selectedCities, chartStore.fetchChartData);

  // autocomplete
  const {
    showAutocomplete,
    handleInputChange: handleAutocompleteInputChange,
    handleKeyDown,
  } = useAutocomplete(formStore.autocompleteSuggestion);

  // form text: button and input placeholder
  const isIntroMode = cityStore.isIntroMode();
  const placeholder = isIntroMode
    ? "Enter a city name..."
    : "Add city to compare...";
  const buttonText = isIntroMode ? "Show Daylight" : "Add";

  // event handlers for input and submit
  const handleInputChange = useCallback(
    (value) => {
      handleAutocompleteInputChange(value, formStore.handleInputChange);
    },
    [handleAutocompleteInputChange, formStore.handleInputChange]
  );

  const handleKeyDownWithAutocomplete = useCallback(
    (e) => {
      handleKeyDown(e, formStore.handleInputChange);
    },
    [handleKeyDown, formStore.handleInputChange]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      cityStore.addCity(formStore.cityName, notificationStore.showNotification);
      formStore.resetForm();
    },
    [cityStore, formStore, notificationStore.showNotification]
  );

  // filter search results (exclude already selected cities)
  const filteredSearchResults = useMemo(
    () =>
      formStore.searchResults.filter((city) => !cityStore.isCitySelected(city)),
    [formStore.searchResults, cityStore.isCitySelected]
  );

  // form validation
  const formValidation = formStore.getFormValidation();

  // reset all
  const resetAll = useCallback(() => {
    formStore.resetForm();
    cityStore.resetCities();
    chartStore.resetChart();
  }, [formStore.resetForm, cityStore.resetCities, chartStore.resetChart]);

  return {
    // form state
    cityName: formStore.cityName,
    searchResults: filteredSearchResults,
    searchLoading: formStore.searchLoading,
    searchError: formStore.searchError,
    autocompleteSuggestion: formStore.autocompleteSuggestion,

    // city state
    selectedCities: cityStore.selectedCities,
    isIntroMode,
    cityColors: chartStore.cityColors,

    // chart state
    chartData: chartStore.chartData,
    chartLoading: chartStore.chartLoading,
    chartError: chartStore.chartError,

    // form text
    placeholder,
    buttonText,

    showAutocomplete,

    // actions
    handleInputChange,
    handleKeyDown: handleKeyDownWithAutocomplete,
    handleSubmit,
    addCity: cityStore.addCity,
    removeCity: cityStore.removeCity,
    isCitySelected: cityStore.isCitySelected,
    initializePopularCities: formStore.initializePopularCities,

    // validation
    ...formValidation,

    // reset actions
    resetForm: formStore.resetForm,
    resetCities: cityStore.resetCities,
    resetChart: chartStore.resetChart,
    resetAll,
  };
};

export default useForm;
