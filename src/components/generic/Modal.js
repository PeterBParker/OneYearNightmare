import { func, node, string } from "prop-types";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal backdrop-blur-sm" onClick={props.onClose}>
      <div
        className={`modal-content bg-white rounded-lg overflow-hidden ${props.contentClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-title ${props.titleClasses}`}>{props.title}</div>
        <div className={`modal-body ${props.bodyClasses}`}>{props.body}</div>
        <div className={`modal-footer ${props.footerClasses}`}>
          {props.footer}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: func.isRequired,
  title: node.isRequired,
  body: node.isRequired,
  footer: node.isRequired,
};
