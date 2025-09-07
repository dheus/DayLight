export const createChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.parsed.y;
          if (value !== null && value !== undefined) {
            // server-processed formatted data
            const formattedValue =
              context.dataset.formattedData?.[context.dataIndex];
            if (formattedValue) {
              return `${context.dataset.label}: ${formattedValue}`;
            }
            // client-side formatting if server data not available
            const hours = Math.floor(value);
            const minutes = Math.round((value - hours) * 60);
            return `${context.dataset.label}: ${hours}h ${minutes}m`;
          }
          return "";
        },
        title: function (context) {
          return context[0].label;
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: false,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Hours",
      },
      min: 0,
      max: 24,
      ticks: {
        callback: function (value) {
          // server-processed formatted data
          if (this.chart?.data?.formattedYAxisLabels) {
            return (
              this.chart.data.formattedYAxisLabels[value] ||
              `${Math.floor(value)}h`
            );
          }
          // to client-side formatting
          return `${Math.floor(value)}h`;
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
});
