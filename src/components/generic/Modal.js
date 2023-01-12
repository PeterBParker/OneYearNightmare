export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div
        className="modal-content bg-white rounded p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">{props.title}</div>
        </div>
        <div className="modal-body pt-2 pb-6">{props.body}</div>
        <div className="modal-footer">{props.footer}</div>
      </div>
    </div>
  );
}
