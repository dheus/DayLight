import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCityStore = create(
  devtools(
    (set, get) => ({
      selectedCities: [],

      // add city
      addCity: (city, showNotification) => {
        try {
          const trimmedCity = city.trim();

          if (trimmedCity.length > 100) {
            throw new Error("City name is too long (maximum 100 characters)");
          }

          const { selectedCities } = get();

          if (selectedCities.includes(trimmedCity)) {
            showNotification?.(
              "City already added",
              "This city is already in your list"
            );
            return;
          }

          if (selectedCities.length >= 10) {
            showNotification?.(
              "Maximum cities reached",
              `You can only compare up to 10 cities`
            );
            return;
          }

          set((state) => ({
            selectedCities: [...state.selectedCities, trimmedCity],
          }));
        } catch (error) {
          showNotification?.("Invalid city name", error.message);
        }
      },

      removeCity: (city) => {
        set((state) => ({
          selectedCities: state.selectedCities.filter((c) => c !== city),
        }));
      },

      isCitySelected: (cityName) => {
        const { selectedCities } = get();
        return selectedCities.some(
          (city) => city.toLowerCase() === cityName.toLowerCase()
        );
      },

      isIntroMode: () => get().selectedCities.length === 0,

      // Reset actions
      resetCities: () => set({ selectedCities: [] }),
    }),
    {
      name: "city-store",
    }
  )
);

export default useCityStore;
