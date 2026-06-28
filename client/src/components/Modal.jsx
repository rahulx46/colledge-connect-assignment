import { useEffect, useRef } from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4 py-6">
      <button
        className="absolute inset-0 bg-slate-950/45"
        type="button"
        onClick={onClose}
        aria-label="Close modal"
      />
      <section
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-md border border-slate-200 bg-white shadow-soft outline-none dark:border-slate-800 dark:bg-slate-950"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2
            className="text-base font-semibold text-slate-950 dark:text-slate-50"
            id="modal-title"
          >
            {title}
          </h2>
          <button className="icon-button" type="button" onClick={onClose}>
            x
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
