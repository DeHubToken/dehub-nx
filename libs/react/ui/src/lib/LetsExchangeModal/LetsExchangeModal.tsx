import { Dialog } from 'primereact/dialog';

interface LetsExchangeModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const LetsExchangeModal = ({ visible, onDismiss }: LetsExchangeModalProps) => {
  return (
    <Dialog
      modal
      header="Swap"
      visible={visible}
      onHide={onDismiss}
      style={{ width: '420px' }}
      className="bg-gradient-3 border-neon-2"
    >
      <iframe
        src="https://letsexchange.io/v2/widget?affiliate_id=0wKcEmTktPML90Nx&is_iframe=true"
        loading="lazy"
        title="LetsExchange"
        width="100%"
        height="400"
        allow="clipboard-read; clipboard-write"
        className="border-none border-round"
      ></iframe>
    </Dialog>
  );
};

export default LetsExchangeModal;
