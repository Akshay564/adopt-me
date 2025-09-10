import { MutableRefObject, ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  onClose,
}: {
  children: ReactElement;
  onClose: () => void;
}) => {
  const elRef = useRef(document.createElement("div"));
  const modalContentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    const el = elRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
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
