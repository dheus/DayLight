import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { apiService } from "../services/apiService";

const useChartStore = create(
  devtools(
    (set, get) => ({
      chartData: null,
      chartLoading: false,
      chartError: null,
      cityColors: {},

      setChartData: (data) => {
        set({ chartData: data });

        // city colors from data
        if (data?.datasets) {
          const colors = {};
          data.datasets.forEach((dataset) => {
            colors[dataset.label] = dataset.borderColor;
          });
          set({ cityColors: colors });
        }
      },

      setChartLoading: (loading) => set({ chartLoading: loading }),

      setChartError: (error) => set({ chartError: error }),

      // fetch data
      fetchChartData: async (selectedCities) => {
        if (!selectedCities || selectedCities.length === 0) {
          set({ chartData: null, chartLoading: false, chartError: null });
          return;
        }

        if (!Array.isArray(selectedCities)) {
          set({
            chartError: new Error("Invalid cities data format"),
            chartLoading: false,
          });
          return;
        }

        if (selectedCities.length === 0) {
          set({
            chartError: new Error("Please select at least one city to compare"),
            chartLoading: false,
          });
          return;
        }

        set({ chartLoading: true, chartError: null });

        try {
          const data = await apiService.getChartData(selectedCities);
          get().setChartData(data);
          set({ chartLoading: false });
        } catch (error) {
          set({ chartError: error, chartLoading: false });
        }
      },

      // Reset actions
      resetChart: () =>
        set({
          chartData: null,
          chartLoading: false,
          chartError: null,
          cityColors: {},
        }),
    }),
    {
      name: "chart-store",
    }
  )
);

export default useChartStore;
