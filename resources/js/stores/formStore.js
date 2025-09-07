import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { apiService } from "../services/apiService";

const useFormStore = create(
  devtools(
    (set, get) => ({
      cityName: "",
      searchResults: [],
      searchLoading: false,
      searchError: null,
      autocompleteSuggestion: null,

      handleInputChange: (newValue) => {
        set({
          cityName: newValue,
        });
        // search when input changes
        get().searchCities(newValue);
      },

      searchCities: async (cityName) => {
        const trimmedName = cityName?.trim() || "";
        const isSearchMode = trimmedName.length > 2;

        set({ searchLoading: true, searchError: null });

        try {
          const results = await apiService.searchCities(
            isSearchMode ? trimmedName : "",
            15
          );
          const cityNames = results.map((city) => city.name);

          const autocompleteSuggestion = get().getAutocompleteSuggestion(
            trimmedName,
            cityNames
          );

          set({
            searchResults: cityNames,
            autocompleteSuggestion,
            searchLoading: false,
          });
        } catch (error) {
          set({
            searchError: error,
            searchLoading: false,
            searchResults: [],
            autocompleteSuggestion: null,
          });
        }
      },

      getAutocompleteSuggestion: (input, cities) => {
        if (!input || cities.length === 0) return null;

        const lowerInput = input.toLowerCase();

        const exactMatch = cities.find(
          (city) => city.toLowerCase() === lowerInput
        );
        if (exactMatch) return null; // no match = no autocomplete

        // find the best partial match
        const bestMatch = cities.find((city) =>
          city.toLowerCase().startsWith(lowerInput)
        );

        return bestMatch || null;
      },

      initializePopularCities: () => {
        const { searchResults } = get();
        if (searchResults.length === 0) {
          get().searchCities("");
        }
      },

      getFormValidation: () => {
        const { cityName, searchResults, searchLoading, searchError } = get();
        const trimmedCityName = cityName.trim();
        const hasExactMatch = searchResults.some(
          (city) => city.toLowerCase() === trimmedCityName.toLowerCase()
        );

        return {
          hasExactMatch,
          isSubmitDisabled: !trimmedCityName || searchLoading || !hasExactMatch,
          searchLoading,
          searchError,
        };
      },

      resetForm: () =>
        set({
          cityName: "",
          searchResults: [],
          searchLoading: false,
          searchError: null,
          autocompleteSuggestion: null,
        }),
    }),
    {
      name: "form-store",
    }
  )
);

export default useFormStore;
