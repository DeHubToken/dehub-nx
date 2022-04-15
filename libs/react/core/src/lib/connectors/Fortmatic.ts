import { Networks } from '@dehub/shared/config';
import { getRandomRpcUrl } from '@dehub/shared/utils';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import invariant from 'tiny-invariant';

export const OVERLAY_READY = 'OVERLAY_READY';

const chainIdToNetwork: { [network: number]: string } = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan',
  56: 'bsc',
  97: 'bsc_testnet',
};

interface FortmaticConnectorArguments {
  apiKey: string;
  chainId: number;
}

export class FortmaticConnector extends AbstractConnector {
  private readonly apiKey: string;
  private readonly chainId: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fortmatic: any;

  constructor({ apiKey, chainId }: FortmaticConnectorArguments) {
    invariant(
      Object.keys(chainIdToNetwork).includes(chainId.toString()),
      `Unsupported chainId ${chainId}`
    );
    super({ supportedChainIds: [chainId] });

    this.apiKey = apiKey;
    this.chainId = chainId;
  }

  async activate(): Promise<ConnectorUpdate> {
    if (!this.fortmatic) {
      const { default: Fortmatic } = await import('fortmatic');

      const rpcUrl = getRandomRpcUrl(Networks[this.chainId].nodes);

      this.fortmatic = new Fortmatic(this.apiKey, {
        chainId: this.chainId,
        rpcUrl: rpcUrl,
      });
    }

    const account = await this.fortmatic
      .getProvider()
      .enable()
      .then((accounts: string[]): string => accounts[0]);

    return {
      provider: this.fortmatic.getProvider(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chainId: (this as any).chainId,
      account,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getProvider(): Promise<any> {
    return this.fortmatic.getProvider();
  }

  async getChainId(): Promise<number | string> {
    return this.chainId;
  }

  async getAccount(): Promise<null | string> {
    return this.fortmatic
      .getProvider()
      .send('eth_accounts')
      .then((accounts: string[]): string => accounts[0]);
  }

  async deactivate() {
    await this.fortmatic.user.logout();
    this.emitDeactivate();
  }

  async close() {
    if (this.fortmatic && this.fortmatic.user) {
      this.deactivate();
    }
  }
}
