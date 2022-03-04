import { Dialog } from 'primereact/dialog';

interface BuyDeHubFloozModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const BuyDeHubFloozModal = ({
  visible,
  onDismiss,
}: BuyDeHubFloozModalProps) => {
  return (
    <Dialog
      visible={visible}
      modal
      className="p-fluid bg-gradient-3 border-neon-2"
      header="Decentralised Exchange"
      style={{ width: '420px' }}
      onHide={onDismiss}
    >
      <iframe
        src="https://www.flooz.trade/embedded/0xFC206f429d55c71cb7294EfF40c6ADb20dC21508/?refId=AbAsFD&backgroundColor=transparent"
        allow="clipboard-read; clipboard-write; web-share; accelerometer *; autoplay *; camera *; gyroscope *; payment *"
        loading="lazy"
        title="Flooz Trade"
        width="100%"
        height="640"
        frameBorder="0"
        className="border-round"
        style={{ marginTop: '-40px' }}
      ></iframe>
    </Dialog>
  );
};

export default BuyDeHubFloozModal;
