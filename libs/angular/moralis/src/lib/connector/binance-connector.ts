import { bscEnabled } from '@dehub/shared/utils';
import AbstractWeb3Connector, {
  ActivateResponse,
} from './abstract-web3-connector';

/**
 * Binance Wallet Connector
 * SDK: https://docs.binance.org/smart-chain/wallet/wallet_api.html
 */
export class BinanceConnector extends AbstractWeb3Connector {
  type = 'bsc';

  constructor() {
    super();
  }

  public async activate(): Promise<ActivateResponse> {
    const provider = bscEnabled();

    // https://docs.binance.org/smart-chain/wallet/wallet_api.html#using-the-provider
    const account: string | undefined = await provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: string[]) => accounts[0]);

    const chainId = provider.chainId;

    this.provider = provider;
    this.chainId = chainId;
    this.account = account;

    this.subscribeToEvents(provider);

    console.info(`account: ${account}, chainId: ${chainId}`);

    return {
      provider,
      ...(chainId && { chainId }),
      ...(account && { account }),
    };
  }
}
