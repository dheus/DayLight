import { useState, useEffect } from "react";

const STORAGE_KEY = "hasSeenKeyboardShortcuts";

const useKeyboardShortcuts = (shouldShow, autoHideDelay = 5000) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (shouldShow) {
      const hasSeenKeyboardShortcuts = localStorage.getItem(STORAGE_KEY);
      if (!hasSeenKeyboardShortcuts) {
        setShowPopup(true);
      }
    }
  }, [shouldShow]);

  useEffect(() => {
    if (showPopup) {
      // short delay
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      // auto-hide
      const hideTimer = setTimeout(() => {
        handleClose();
      }, autoHideDelay);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showPopup, autoHideDelay]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setShowPopup(false);
      localStorage.setItem(STORAGE_KEY, "true");
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isVisible]);

  return {
    showPopup,
    isVisible,
    isClosing,
    handleClose,
  };
};

export default useKeyboardShortcuts;
