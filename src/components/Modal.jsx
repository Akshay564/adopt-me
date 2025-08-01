import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  const elRef = useRef(document.createElement("div"));
  const modalContentRef = useRef(null);

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    const el = elRef.current;
    modalRoot.appendChild(el);

    const handleClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      modalRoot.removeChild(el);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content" ref={modalContentRef}>
        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
