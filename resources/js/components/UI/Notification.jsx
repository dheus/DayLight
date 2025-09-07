import React from "react";
import useNotificationStore from "../../stores/notificationStore";

const Notification = () => {
  const { notification } = useNotificationStore();

  if (!notification.isVisible) {
    return null;
  }

  return (
    <div className="notification">
      <div className="notification__content">
        <div className="notification__text">
          <div className="notification__title">{notification.title}</div>
          <div className="notification__subtitle">{notification.subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
