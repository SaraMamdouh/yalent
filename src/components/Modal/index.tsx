import React from "react";
import styles from "./index.module.css"; // Optional: Add styles for your modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  disabled,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} aria-label='modal-overlay'>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title" 
        aria-label="modal">

        <div className={styles.modalContent}>
            <div className={styles.modalHeader} aria-label="modal-header">
            {title && (
              <h2 id="modal-title" aria-label="modal-title" >
              {title}
              </h2>
            )}
            <button
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
          <div className={styles.modalBody}>{children}</div>
          {onSubmit ? (
        <button
          className={styles.modalButton}
          onClick={onSubmit}
          disabled={disabled}
          aria-disabled={disabled}
          aria-label="Confirm action"
          type="button"
        >
          Confirm
        </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
export type { ModalProps };
