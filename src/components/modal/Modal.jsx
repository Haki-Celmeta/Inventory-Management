import {X} from 'lucide-react'
import "./modal.css"

/**
 * Reusable modal component with backdrop click-to-close functionality.
 * @param {React.ReactNode} children - Modal content to be displayed
 * @param {string} title - Modal header title
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function called when modal is closed
 */
const Modal = ({children, title, isOpen, onClose}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" data-testid={'modal-backdrop'} onClick={handleBackdropClick}>
            <div className="modal" data-testid={'modal'}>
                <div className="modal-header" data-testid={'modal-header'}>
                    <h2 className="modal-title">{title}</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <X size={20}/>
                    </button>
                </div>
                <div className="modal-content" data-testid={'modal-content'}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;