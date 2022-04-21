import { ReactComponent as BscIcon } from '@dehub/shared/asset/dehub/icons/bsc.svg';
import { ReactComponent as CoinbaseIcon } from '@dehub/shared/asset/dehub/icons/coinbase.svg';
import { ReactComponent as MagicLinkIcon } from '@dehub/shared/asset/dehub/icons/magic.svg';
import { ReactComponent as MetaMaskIcon } from '@dehub/shared/asset/dehub/icons/metamask.svg';
import { ReactComponent as TrustWalletIcon } from '@dehub/shared/asset/dehub/icons/trustwallet.svg';
import { ReactComponent as WalletConnectIcon } from '@dehub/shared/asset/dehub/icons/walletconnect.svg';
import {
  DeHubConnectorNames,
  MoralisConnectorNames,
  Web3ConnectorNames,
} from '@dehub/shared/model';
import { isEmailValid } from '@dehub/shared/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import styled from 'styled-components';

interface WalletModalProps {
  visible: boolean;
  onDismiss: () => void;
  doConnect: (provider: DeHubConnectorNames, magicLinkEmail?: string) => void;
}

const WalletButton = styled(Button)`
  color: var(--surface-500) !important;
  &:hover {
    color: white !important;
    transform: scale(103%);
  }
`;

const WalletModal = ({ visible, onDismiss, doConnect }: WalletModalProps) => {
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [invalidMagicLinkEmail, setInvalidMagicLinkEmail] = useState(false);

  const initialize = () => {
    setMagicLinkEmail('');
    setInvalidMagicLinkEmail(false);
  };

  return (
    <Dialog
      visible={visible}
      modal
      className="p-fluid border-neon-1"
      header="Connect Wallet"
      style={{ width: '350px' }}
      onHide={() => {
        initialize();
        onDismiss();
      }}
    >
      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(MoralisConnectorNames.Injected)}
        >
          <div>Browser Wallet</div>
          <div className="flex flex-row align-items-center">
            <MetaMaskIcon style={{ width: '32px', height: '16px' }} />
            <TrustWalletIcon
              style={{
                width: '32px',
                height: '20px',
              }}
            />
          </div>
        </WalletButton>
      </div>

      <Inplace>
        <InplaceDisplay>
          <div className="mt-2 mb-3">
            <WalletButton className="flex justify-content-between text-500">
              <div>MagicLink</div>
              <div className="flex flex-row align-items-center">
                <MagicLinkIcon style={{ width: '32px', height: '16px' }} />
              </div>
            </WalletButton>
          </div>
        </InplaceDisplay>
        <InplaceContent>
          <AnimatePresence>
            <motion.div
              className="grid"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: 'tween', ease: 'easeOut' }}
            >
              <div className="col-8">
                <InputText
                  className={invalidMagicLinkEmail ? 'ng-dirty ng-invalid' : ''}
                  type="text"
                  placeholder="Magic email"
                  value={magicLinkEmail}
                  onChange={e => {
                    setMagicLinkEmail(e.target.value);
                    setInvalidMagicLinkEmail(!isEmailValid(e.target.value));
                  }}
                  required
                />
              </div>

              <div className="col-4">
                <Button
                  disabled={invalidMagicLinkEmail}
                  icon={
                    <MagicLinkIcon
                      style={{
                        width: '32px',
                        height: '16px',
                        paddingRight: '10px',
                      }}
                    />
                  }
                  label={'Login'}
                  onClick={() =>
                    doConnect(MoralisConnectorNames.MagicLink, magicLinkEmail)
                  }
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </InplaceContent>
      </Inplace>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(MoralisConnectorNames.WalletConnect)}
        >
          <div>WalletConnect</div>
          <div className="flex flex-row align-items-center">
            <WalletConnectIcon style={{ width: '32px', height: '11px' }} />
          </div>
        </WalletButton>
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(Web3ConnectorNames.WalletLink)}
        >
          <div>Coinbase</div>
          <div className="flex flex-row align-items-center">
            <CoinbaseIcon style={{ width: '32px', height: '20px' }} />
          </div>
        </WalletButton>
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(Web3ConnectorNames.BSC)}
        >
          <div>Binance</div>
          <div className="flex flex-row align-items-center">
            <BscIcon style={{ width: '32px', height: '20px' }} />
          </div>
        </WalletButton>
      </div>
    </Dialog>
  );
};

export default WalletModal;
