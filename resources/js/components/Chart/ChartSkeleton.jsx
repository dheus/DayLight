import React from "react";

const ChartSkeleton = () => {
  return (
    <div className="chart">
      <div className="chart-skeleton">
        {/* Chart Title Skeleton */}
        <div className="chart-skeleton__title">
          <div className="skeleton-line skeleton-line--title"></div>
        </div>

        {/* Chart Area Skeleton */}
        <div className="chart-skeleton__area">
          {/* Y-axis labels */}
          <div className="chart-skeleton__y-axis">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="skeleton-line skeleton-line--y-label"
              ></div>
            ))}
          </div>

          {/* Chart grid and lines */}
          <div className="chart-skeleton__grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="chart-skeleton__grid-line"></div>
            ))}
          </div>

          {/* Data lines skeleton */}
          <div className="chart-skeleton__data-lines">
            <div className="chart-skeleton__line chart-skeleton__line--1"></div>
            <div className="chart-skeleton__line chart-skeleton__line--2"></div>
            <div className="chart-skeleton__line chart-skeleton__line--3"></div>
          </div>

          {/* X-axis labels */}
          <div className="chart-skeleton__x-axis">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="skeleton-line skeleton-line--x-label"
              ></div>
            ))}
          </div>
        </div>

        {/* Legend Skeleton */}
        <div className="chart-skeleton__legend">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="chart-skeleton__legend-item">
              <div className="chart-skeleton__legend-color"></div>
              <div className="skeleton-line skeleton-line--legend"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartSkeleton;
