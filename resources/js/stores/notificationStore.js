import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useNotificationStore = create(
  devtools(
    (set, get) => ({
      notification: {
        isVisible: false,
        title: "",
        subtitle: "",
        duration: 5000,
      },

      showNotification: (title, subtitle, duration = 5000) => {
        set({
          notification: {
            isVisible: true,
            title,
            subtitle,
            duration,
          },
        });

        // auto-dismiss
        setTimeout(() => {
          get().hideNotification();
        }, duration);
      },

      hideNotification: () => {
        set((state) => ({
          notification: {
            ...state.notification,
            isVisible: false,
          },
        }));
      },
    }),
    {
      name: "notification-store",
    }
  )
);

export default useNotificationStore;
