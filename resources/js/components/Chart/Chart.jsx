import React, { useMemo } from "react";
import "./chartRegistration";
import { Line } from "react-chartjs-2";
import "./Chart.scss";
import { createChartOptions } from "./chartConfig";
import ChartSkeleton from "./ChartSkeleton";
import { useFormContext } from "../../contexts/FormContext";

const Chart = () => {
  const { chartData, chartLoading, isIntroMode } = useFormContext();

  // chart options
  const options = useMemo(() => createChartOptions(), []);

  if (isIntroMode) return null;

  //  skeleton loading
  if (
    chartLoading ||
    !chartData ||
    !chartData.labels ||
    chartData.labels.length === 0
  ) {
    return <ChartSkeleton />;
  }

  return (
    <div className="chart">
      <div style={{ height: "400px", width: "100%" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
