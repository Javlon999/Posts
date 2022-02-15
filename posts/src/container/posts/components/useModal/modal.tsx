
import ReactDOM from "react-dom";
import './modal.css';

// typescript interface 
export interface Showing {
    isShowing:Boolean,
    hide: any,
    title: string,
    children:any
}

const Modal = ({ isShowing, hide, title, ...props }: Showing) =>
  
 // make modla for update , edit ,delete
  
isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4>{title}</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">{props.children}</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
        : null;
    
export default Modal;