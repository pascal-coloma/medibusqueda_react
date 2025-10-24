import { createPortal } from 'react-dom';
import './modal.css';

function Popup({ trigger, children, onClose }) {
  if (!trigger) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onClose && onClose();
    }
  }

  return createPortal(
    <div className="popup" onClick={handleBackgroundClick}>
      <div className="popup-inner">
        {children}
        <button 
          className="btn-close position-absolute top-0 end-0 m-3" 
          onClick={onClose}>
        </button>
      </div>
    </div>,
    document.body // <-- renderiza el modal directamente en el body
  )
}

export default Popup;
