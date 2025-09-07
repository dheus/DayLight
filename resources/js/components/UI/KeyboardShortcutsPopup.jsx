import "./css/KeyboardShortcutsPopup.scss";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";
import useCityStore from "../../stores/cityStore";

const KeyboardShortcutsPopup = () => {
  const isIntroMode = useCityStore((state) => state.isIntroMode());
  const { showPopup, isVisible, isClosing, handleClose } = useKeyboardShortcuts(
    isIntroMode,
    6000
  );

  if (!showPopup || !isVisible) return null;

  return (
    <div
      className={`keyboard-shortcuts-popup ${isClosing ? "closing" : ""}`}
      role="dialog"
      aria-label="Keyboard shortcuts help"
      aria-modal="true"
    >
      <div
        className="keyboard-shortcuts-popup__backdrop"
        onClick={handleClose}
      />

      <div className="keyboard-shortcuts-popup__content">
        <div className="keyboard-shortcuts-popup__header">
          <h3 className="keyboard-shortcuts-popup__title">
            💡 Keyboard Shortcuts
          </h3>
          <button
            className="keyboard-shortcuts-popup__close"
            onClick={handleClose}
            aria-label="Close keyboard shortcuts"
          >
            ×
          </button>
        </div>

        <div className="keyboard-shortcuts-popup__shortcuts">
          <div className="keyboard-shortcuts-popup__item">
            <kbd className="keyboard-shortcuts-popup__key" aria-label="Tab key">
              Tab
            </kbd>
            <span className="keyboard-shortcuts-popup__text">
              Accept autocomplete suggestion
            </span>
          </div>

          <div className="keyboard-shortcuts-popup__item">
            <kbd
              className="keyboard-shortcuts-popup__key"
              aria-label="Escape key"
            >
              Esc
            </kbd>
            <span className="keyboard-shortcuts-popup__text">
              Close autocomplete or this popup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsPopup;
