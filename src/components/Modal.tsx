import { Button, Modal } from "react-bootstrap";

interface modalProps {
  show: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  confirmVariant?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export type ModalType = "logout" | "delete" | null;

const ConfirmModal = function ({
  show,
  title,
  body,
  confirmLabel,
  confirmVariant = "danger",
  onConfirm,
  onClose,
}: modalProps) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annulla
        </Button>
        <Button
          variant={confirmVariant}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
