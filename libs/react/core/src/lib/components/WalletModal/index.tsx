import {
  DeHubConnectorNames,
  MoralisConnectorNames,
  WalletConnectingState,
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
import { useWeb3Context } from '../../hooks';

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

  const { walletConnectingState } = useWeb3Context();
  const [connectorId, setConnectorId] = useState<DeHubConnectorNames | ''>('');

  const initialize = () => {
    setMagicLinkEmail('');
    setInvalidMagicLinkEmail(false);
    setConnectorId('');
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
          onClick={() => {
            setConnectorId(MoralisConnectorNames.Injected);
            doConnect(MoralisConnectorNames.Injected);
          }}
        >
          <div>Browser Wallet</div>
          <div className="flex flex-row align-items-center">
            <img
              src="/assets/dehub/icons/metamask.svg"
              style={{ width: '32px', height: '20px' }}
              alt="MetaMask logo"
            />
            <img
              src="/assets/dehub/icons/trustwallet.svg"
              style={{
                width: '32px',
                height: '20px',
              }}
              alt="Trust Wallet logo"
            />
          </div>
        </WalletButton>

        {walletConnectingState === WalletConnectingState.NO_PROVIDER &&
          connectorId === MoralisConnectorNames.Injected && (
            <AnimatePresence>
              <motion.div
                className="m-2"
                initial={{ opacity: 0, y: '-100%' }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{ duration: 0.5, type: 'tween', ease: 'easeOut' }}
              >
                Please install or reload{' '}
                <a href="https://metamask.io/" target="_blank" rel="noreferrer">
                  MetaMask
                </a>{' '}
                extension on your browser.
              </motion.div>
            </AnimatePresence>
          )}
      </div>

      <Inplace>
        <InplaceDisplay>
          <div className="mt-2 mb-3">
            <WalletButton className="flex justify-content-between text-500">
              <div>MagicLink</div>
              <div className="flex flex-row align-items-center">
                <img
                  src="/assets/dehub/icons/magic.svg"
                  style={{ width: '32px', height: '20px' }}
                  alt="MagicLink logo"
                />
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
                    <img
                      src="/assets/dehub/icons/magic.svg"
                      style={{
                        width: '32px',
                        height: '16px',
                        paddingRight: '10px',
                      }}
                      alt="MagicLink logo"
                    />
                  }
                  label={'Login'}
                  onClick={() => {
                    setConnectorId(MoralisConnectorNames.MagicLink);
                    doConnect(MoralisConnectorNames.MagicLink, magicLinkEmail);
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </InplaceContent>
      </Inplace>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => {
            setConnectorId(MoralisConnectorNames.WalletConnect);
            doConnect(MoralisConnectorNames.WalletConnect);
          }}
        >
          <div>WalletConnect</div>
          <div className="flex flex-row align-items-center">
            <img
              src="/assets/dehub/icons/walletconnect.svg"
              style={{ width: '32px', height: '20px' }}
              alt="WalletConnect logo"
            />
          </div>
        </WalletButton>
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => {
            setConnectorId(Web3ConnectorNames.BSC);
            doConnect(Web3ConnectorNames.BSC);
          }}
        >
          <div>Binance</div>
          <div className="flex flex-row align-items-center">
            <img
              src="/assets/dehub/icons/bsc.svg"
              style={{ width: '32px', height: '20px' }}
              alt="Binance Wallet logo"
            />
          </div>
        </WalletButton>

        {walletConnectingState === WalletConnectingState.NO_PROVIDER &&
          connectorId === Web3ConnectorNames.BSC && (
            <AnimatePresence>
              <motion.div
                className="mt-2"
                initial={{ opacity: 0, y: '-100%' }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{ duration: 0.5, type: 'tween', ease: 'easeOut' }}
              >
                Please install{' '}
                <a
                  href="https://docs.binance.org/smart-chain/wallet/binance.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Binance Wallet
                </a>{' '}
                extension on your browser.
              </motion.div>
            </AnimatePresence>
          )}
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => {
            setConnectorId(Web3ConnectorNames.WalletLink);
            doConnect(Web3ConnectorNames.WalletLink);
          }}
        >
          <div>Coinbase</div>
          <div className="flex flex-row align-items-center">
            <img
              src="/assets/dehub/icons/coinbase.svg"
              style={{ width: '32px', height: '20px' }}
              alt="Coinbase Wallet logo"
            />
          </div>
        </WalletButton>
      </div>
    </Dialog>
  );
};

export default WalletModal;
