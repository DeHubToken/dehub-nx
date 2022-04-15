import { Networks } from '@dehub/shared/config';
import { Web3ConnectorNames } from '@dehub/shared/model';
import { getRandomRpcUrl } from '@dehub/shared/utils';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { FortmaticConnector } from '../connectors/Fortmatic';

export const getWalletConnector = (
  connectorId: Web3ConnectorNames,
  chainId: number,
  fortmatic: string
): AbstractConnector => {
  switch (connectorId) {
    case Web3ConnectorNames.WalletLink: {
      return new WalletLinkConnector({
        appName: 'DeHub',
        url: getRandomRpcUrl(Networks[chainId].nodes),
      });
    }
    case Web3ConnectorNames.Fortmatic: {
      return new FortmaticConnector({
        apiKey: fortmatic,
        chainId,
      });
    }
    case Web3ConnectorNames.Torus: {
      return new TorusConnector({
        chainId,
        initOptions: {
          network: {
            host: getRandomRpcUrl(Networks[chainId].nodes),
            chainId,
          },
          showTorusButton: false,
          enableLogging: false,
          enabledVerifiers: false,
        },
      });
    }
  }
  throw new Error('Unknown Connector');
};
