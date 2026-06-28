import Modal from "./Modal.jsx";

const ConfirmDialog = ({ isOpen, onCancel, onConfirm, task }) => (
  <Modal isOpen={isOpen} onClose={onCancel} title="Delete task">
    <div className="space-y-4 p-5">
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        Delete <span className="font-medium text-slate-950 dark:text-slate-50">{task?.title}</span>?
        This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="danger-button" type="button" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
