import ModalBase, {
  type ModalProps as ModalBaseProps,
} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export interface ModalProps extends ModalBaseProps {
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ children, title, ...props }) => {
  return (
    <ModalBase
      center
      closeIcon={
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <path 
            d="M18 6L6 18M6 6l12 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      }
      focusTrapped={false}
      {...props}
      classNames={{
        root: 'modal-overlay',
        modal: 'custom-modal',
        closeButton: 'custom-close-button',
        ...props?.classNames,
      }}
      styles={{
        modal: {
          fontFamily: 'inherit', // Hereda la fuente de la página
          padding: '0', // Quitamos el padding por defecto
        }
      }}
    >
      <div className="modal-content">
        {/* Header del modal con título y X */}
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
        </div>
        
        {/* Contenido del modal */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </ModalBase>
  );
};

export default Modal;