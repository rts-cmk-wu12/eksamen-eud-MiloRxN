export default function ModalActions({
  onCancel, confirmDisabled = false, confirmLabel = "Confirm", cancelLabel = "Cancel"
}) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        type="submit"
        className={`${confirmDisabled ? 'button-secondary border-0 rounded-md cursor-not-allowed' : 'button-primary border-0 rounded-md'}`}
        disabled={confirmDisabled}
      >
        {confirmLabel}
      </button>
      <button
        type="button"
        className="button-primary border-0 rounded-md"
        onClick={onCancel}
      >
        {cancelLabel}
      </button>
    </div>
  );
}