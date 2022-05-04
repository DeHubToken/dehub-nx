import {
  EIP1193Provider,
  ProviderInfo,
  ProviderRpcError,
} from 'eip1193-provider';
import { EventEmitter } from 'events';
/**
 * Decimal to hex with verification.
 * @param number Source: https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/utils/convert.js
 * @returns
 */
const fromDecimalToHex = (number: number) => {
  if (typeof number !== 'number') throw 'The input provided should be a number';
  return `0x${number.toString(16)}`;
};

/**
 * Source: https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/Web3Connector/events.js
 *
 * Events being emitted by an eip-1193 provider
 * See https://eips.ethereum.org/EIPS/eip-1193#events
 */
enum EthereumEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHAIN_CHANGED = 'chainChanged',
  ACCOUNTS_CHANGED = 'accountsChanged',
  NETWORK_CHANGED = 'networkChanged',
}

/**
 * Source: https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/Web3Connector/events.js
 *
 * Events emitted by the connectors
 * The InternalWeb3Provider of Moralis will listen to these
 */
enum ConnectorEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHAIN_CHANGED = 'chainChanged',
  ACCOUNT_CHANGED = 'accountChanged',
}

/**
 * Source: https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/utils/verifyChainId.js
 * Converts chainId to a hex if it is a number
 */
function verifyChainId(chainId: string | number) {
  if (typeof chainId === 'number') chainId = fromDecimalToHex(chainId);
  return chainId;
}

export type ActivateResponse = {
  account?: string;
  provider: EIP1193Provider;
  chainId?: string;
};

/**
 * Source: https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/Web3Connector/AbstractWeb3Connector.js
 *
 * Abstract connector to connect EIP-1193 providers to Moralis
 *
 * It should implement at least:
 * - activate()
 * - Emit ConnectorEvent.CHAIN_CHANGED when the chain has changed (if possible)
 * - Emit ConnectorEvent.ACCOUNT_CHANGED when the account has changed (if possible)
 * - type: a name to identify
 * - network: the network type that is used (eg. 'evm')
 */
abstract class AbstractWeb3Connector extends EventEmitter {
  type = 'abstract';
  network = 'evm';

  account?: string;
  chainId?: string;
  provider?: EIP1193Provider;

  constructor() {
    super();
    console.info('abstract constructor');
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  subscribeToEvents(provider: EIP1193Provider) {
    if (provider && provider.on) {
      console.info('abstract subscribeToEvents', provider);
      provider.on(EthereumEvents.CHAIN_CHANGED, this.handleChainChanged);
      provider.on(EthereumEvents.ACCOUNTS_CHANGED, this.handleAccountsChanged);
      provider.on(EthereumEvents.CONNECT, this.handleConnect);
      provider.on(EthereumEvents.DISCONNECT, this.handleDisconnect);
    }
  }

  unsubscribeToEvents(provider: EIP1193Provider) {
    if (provider && provider.removeListener) {
      console.info('abstract unsubscribeToEvents', provider);
      provider.removeListener(
        EthereumEvents.CHAIN_CHANGED,
        this.handleChainChanged
      );
      provider.removeListener(
        EthereumEvents.ACCOUNTS_CHANGED,
        this.handleAccountsChanged
      );
      provider.removeListener(EthereumEvents.CONNECT, this.handleConnect);
      provider.removeListener(EthereumEvents.DISCONNECT, this.handleDisconnect);
    }
  }

  /**
   * Activates the provider.
   * Should returns an object with:
   * - provider: A valid EIP-1193 provider
   * - chainId(optional): the chainId that has been connected to (in hex format)
   * - account(optional): the address that is connected to the provider
   */
  abstract activate(): Promise<ActivateResponse>;

  /**
   * Updates account and emit event, on EIP-1193 accountsChanged events
   */
  handleAccountsChanged(accounts: string[]) {
    console.info('abstract handleAccountsChanged', accounts);
    const account =
      accounts && accounts[0] ? accounts[0].toLowerCase() : undefined;
    this.account = account;
    this.emit(ConnectorEvents.ACCOUNT_CHANGED, account);
  }

  /**
   * Updates chainId and emit event, on EIP-1193 accountsChanged events
   */
  handleChainChanged(chainId: string | number) {
    console.info('abstract handleChainChanged', chainId);
    const newChainId = verifyChainId(chainId);
    this.chainId = newChainId;
    this.emit(ConnectorEvents.CHAIN_CHANGED, newChainId);
  }

  handleConnect(connectInfo: ProviderInfo) {
    console.info('abstract handleConnect', connectInfo);
    this.emit(ConnectorEvents.CONNECT, connectInfo);
  }

  handleDisconnect(error: ProviderRpcError) {
    console.info('abstract handleDisconnect', error);
    this.emit(ConnectorEvents.DISCONNECT, error);
  }

  /**
   * Cleans all active listeners, connections and stale references
   */
  async deactivate() {
    console.info('abstract deactivate', this.provider);
    if (!this.provider) {
      return;
    }

    this.unsubscribeToEvents(this.provider);

    this.account = undefined;
    this.chainId = undefined;
  }
}

export default AbstractWeb3Connector;
