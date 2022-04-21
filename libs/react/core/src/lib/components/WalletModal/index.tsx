import { ReactComponent as BscIcon } from '@dehub/shared/asset/dehub/icons/bsc.svg';
import { ReactComponent as CoinbaseIcon } from '@dehub/shared/asset/dehub/icons/coinbase.svg';
import { ReactComponent as MagicLinkIcon } from '@dehub/shared/asset/dehub/icons/magic.svg';
import { ReactComponent as MetaMaskIcon } from '@dehub/shared/asset/dehub/icons/metamask.svg';
import { ReactComponent as TrustWalletIcon } from '@dehub/shared/asset/dehub/icons/trustwallet.svg';
import { ReactComponent as WalletConnectIcon } from '@dehub/shared/asset/dehub/icons/walletconnect.svg';
import {
  DeHubConnectorNames,
  MoralisConnectorNames,
  WalletConnectingState,
  Web3ConnectorNames,
} from '@dehub/shared/model';
import { isEmailValid } from '@dehub/shared/utils';
import { AnimatePresence, motion, Variants } from 'framer-motion';
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

const duration = 2;

const variants: Variants = {
  initial: {
    y: '-100%',
  },
  open: {
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.5,
      y: {
        duration: 2,
      },
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

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
            <MetaMaskIcon style={{ width: '32px', height: '16px' }} />
            <TrustWalletIcon
              style={{
                width: '32px',
                height: '20px',
              }}
            />
          </div>
        </WalletButton>

        {walletConnectingState === WalletConnectingState.NO_PROVIDER &&
          connectorId === MoralisConnectorNames.Injected && (
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
            <WalletConnectIcon style={{ width: '32px', height: '11px' }} />
          </div>
        </WalletButton>
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
            <CoinbaseIcon style={{ width: '32px', height: '20px' }} />
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
            <BscIcon style={{ width: '32px', height: '20px' }} />
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
    </Dialog>
  );
};

export default WalletModal;
