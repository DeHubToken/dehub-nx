import {
  Currency,
  CurrencyString,
  InitOrderParams,
  InitOrderResult,
  OrderStatus,
} from '@dehub/shared/model';
import { isMoralisUserByAddress } from '../shared';
import { ShopFunctions } from './shop.model';

export const initOrder = async ({
  address,
  productData,
  shippingAddress,
  contentfulId,
}: InitOrderParams): Promise<InitOrderResult | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const user = await isMoralisUserByAddress(address);

    const ipfs = await Moralis.Cloud.toIpfs({
      sourceType: 'object',
      source: productData,
    });
    const { path } = ipfs;

    const match = path.match(
      // eslint-disable-next-line no-useless-escape
      /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
    );
    const ipfsHash = match[5].replace('/ipfs/', '');

    logger.info(`Uploaded IPFS Hash: ${ipfsHash}`);

    const DeHubShopShippingAddresses = Moralis.Object.extend(
      'DeHubShopShippingAddresses'
    );
    const deHubShopShippingAddresses = new DeHubShopShippingAddresses();
    deHubShopShippingAddresses.set('user', user);
    deHubShopShippingAddresses.set('city', shippingAddress.city);
    deHubShopShippingAddresses.set('state', shippingAddress.state);
    deHubShopShippingAddresses.set('country', shippingAddress.country);
    deHubShopShippingAddresses.set('postalCode', shippingAddress.postalCode);
    deHubShopShippingAddresses.set('line1', shippingAddress.line1);
    deHubShopShippingAddresses.set('line2', shippingAddress.line2);
    deHubShopShippingAddresses.set('name', shippingAddress.name);
    await deHubShopShippingAddresses.save(null, { useMasterKey: true });

    // Creates a new DeHubShopOrders item with status IPFSUploading and contentfulId
    const DeHubShopOrders = Moralis.Object.extend('DeHubShopOrders');
    const dehubShopOrders = new DeHubShopOrders();
    dehubShopOrders.set('ipfsHash', ipfsHash);
    dehubShopOrders.set('shippingAddress', deHubShopShippingAddresses);
    dehubShopOrders.set('user', user);
    dehubShopOrders.set('status', OrderStatus.verifying);
    // tokenId should be updated after minting NFT
    dehubShopOrders.set('tokenId', 0);
    dehubShopOrders.set('productName', productData.name);
    dehubShopOrders.set('sku', productData.sku);
    dehubShopOrders.set('contentfulId', contentfulId);
    await dehubShopOrders.save();

    return {
      ipfsHash,
      orderId: dehubShopOrders.id,
    };
  } catch (err) {
    logger.error(`${ShopFunctions.InitOrder} error: ${JSON.stringify(err)}`);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findOrder = async (orderId: string): Promise<any | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubShopOrders = Moralis.Object.extend('DeHubShopOrders');
    const query = new Moralis.Query(DeHubShopOrders);
    query.equalTo('objectId', orderId);
    const result = await query.first();
    if (!result) return null;
    return result;
  } catch (err) {
    logger.error(`${ShopFunctions.InitOrder} error: ${JSON.stringify(err)}`);
    return null;
  }
};

export const checkOrder = async (orderId: string): Promise<string | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const order = await findOrder(orderId);
    if (!order) return null;
    return order.get('status');
  } catch (err) {
    logger.error(`${ShopFunctions.InitOrder} error: ${JSON.stringify(err)}`);
    return null;
  }
};

export const compareCurrency = (
  currency: Currency,
  currencyString: CurrencyString
) => {
  if (currency === Currency.BNB && currencyString === CurrencyString.BNB)
    return true;
  if (currency === Currency.DeHub && currencyString === CurrencyString.DeHub)
    return true;
  if (currency === Currency.BUSD && currencyString === CurrencyString.BUSD)
    return true;
  return false;
};

export const getCheckoutContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        ShopFunctions.GetCheckoutContract,
        async function (args) {
          return JSON.stringify(
            await getCheckoutContract(args as ChainIdAsNumber)
          );
        },
        {
          args: environment.web3.chainId as ChainIdAsNumber,
          expire: 1800,
        }
      )
    );
  } catch (err) {
    logger.error(
      `${ShopFunctions.GetCheckoutContract} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};
