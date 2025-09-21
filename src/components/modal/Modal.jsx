import {X} from 'lucide-react'
import "./modal.css"

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
                    <button className="modal-close-btn" onClick={onClose}>
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