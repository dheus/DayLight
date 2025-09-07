import { useEffect } from "react";

const useChartSync = (selectedCities, fetchChartData) => {
  useEffect(() => {
    if (selectedCities && selectedCities.length > 0) {
      fetchChartData(selectedCities);
    }
  }, [selectedCities, fetchChartData]);
};

export default useChartSync;
