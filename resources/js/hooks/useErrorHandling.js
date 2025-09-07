import { useEffect } from "react";
import useNotificationStore from "../stores/notificationStore";
import { ERRORS } from "../constants";

const useErrorHandling = (formError, chartError) => {
  const notificationStore = useNotificationStore();

  // Handle form/search errors
  useEffect(() => {
    if (formError) {
      console.error("Search Error:", formError);
      notificationStore.showNotification(
        ERRORS.SEARCH_ERROR.title,
        ERRORS.SEARCH_ERROR.subtitle
      );
    }
  }, [formError, notificationStore]);

  // Handle chart errors
  useEffect(() => {
    if (chartError) {
      console.error("Chart Error:", chartError);
      const isConnectionError =
        chartError.message === "SERVER_CONNECTION_ERROR";

      notificationStore.showNotification(
        isConnectionError
          ? ERRORS.CONNECTION_ERROR.title
          : ERRORS.CHART_DATA_ERROR.title,
        isConnectionError
          ? ERRORS.CONNECTION_ERROR.subtitle
          : ERRORS.CHART_DATA_ERROR.subtitle
      );
    }
  }, [chartError, notificationStore]);
};

export default useErrorHandling;
