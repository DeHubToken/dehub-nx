import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import { bscEnabled } from '@dehub/shared/utils';
import { EIP1193Provider } from 'eip1193-provider';
import { Moralis } from 'moralis';
import {
  AbstractWeb3Connector,
  ActivateResponse,
} from './abstract-web3-connector';

const supportedNetworks: { [key: string]: string } = {
  '0x61': 'bsc-testnet',
  '0x38': 'bsc-mainnet',
};

type SwitchNetworkResult = {
  error?: 'user rejected';
  eventId: string;
  id: string;
  networkId: string;
  tabId: number;
  type: 'switchNetwork';
};

type BinanceProvider = EIP1193Provider & {
  switchNetwork: (newNetwork: string) => Promise<SwitchNetworkResult>;
};

export class BinanceNetworkSwitchRejected extends Error {
  reason: SwitchNetworkResult;
  constructor(reason: SwitchNetworkResult) {
    super('Binance network switch rejected.');
    this.reason = reason;
  }
}

/**
 * Binance Wallet Connector
 * SDK: https://docs.binance.org/smart-chain/wallet/wallet_api.html
 */
export class BinanceConnector
  extends AbstractWeb3Connector<BinanceProvider>
  implements Moralis.Connector
{
  type = 'bsc';

  /**
   * Binance Connector constructor
   * @param params from Moralis.authenticate params
   */
  constructor(params?: { chainId: number }) {
    super();

    // Setting the requested chain id from Moralis if given
    if (params) this.chainId = decimalToHex(params.chainId);
  }

  public async activate(): Promise<ActivateResponse> {
    /** Binance Wallet provider */
    const provider = bscEnabled();
    this.provider = provider;

    /** User preferred chain id */
    const chainId: string | undefined = provider.chainId;

    // Switch network if needed
    if (this.provider && this.chainId && this.chainId !== chainId) {
      console.warn('Please switch network!');
      const newNetwork = supportedNetworks[this.chainId];

      await this.provider
        .switchNetwork(newNetwork)
        .then((result: { networkId: string }) =>
          console.info(`Binance network switched to ${result.networkId}.`)
        )
        .catch((reason: SwitchNetworkResult) => {
          throw new BinanceNetworkSwitchRejected(reason);
        });
    }

    /**
     * User selected account
     * Docs: https://docs.binance.org/smart-chain/wallet/wallet_api.html#using-the-provider
     */
    const account: string | null = await provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: string[]) => accounts[0]);
    this.account = account;

    this.subscribeToEvents(provider);

    return {
      provider,
      ...(chainId && { chainId }),
      ...(account && { account }),
    };
  }
}
