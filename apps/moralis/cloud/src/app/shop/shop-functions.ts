import {
  InitOrderParams,
  InitOrderResult,
  MoralisClass,
  MoralisFunctions,
  OrderStatus,
} from '@dehub/shared/model';
import { environment } from '../../environments/environment';
import { ChainIdAsNumber, isMoralisUserByAddress } from '../shared';
import RedisClient from '../shared/redis';
import { getCheckoutContract } from './shop.util';

export const initOrder = async ({
  address,
  productData,
  shippingAddress,
  contentfulId,
}: InitOrderParams): Promise<InitOrderResult | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const user = await isMoralisUserByAddress(address);

    const ipfsImage = await Moralis.Cloud.toIpfs({
      sourceType: 'url',
      source: productData.image,
    });
    const { path: imageIpfsPath } = ipfsImage;

    const regSchema =
      // eslint-disable-next-line no-useless-escape
      /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/;
    const imageIpfsHash = imageIpfsPath
      .match(regSchema)[5]
      .replace('/ipfs/', '');

    const ipfs = await Moralis.Cloud.toIpfs({
      sourceType: 'object',
      source: {
        ...productData,
        image: `ipfs://${imageIpfsHash}`,
      },
    });
    const { path } = ipfs;
    const ipfsHash = path.match(regSchema)[5].replace('/ipfs/', '');
    logger.info(`ipfs: ${path}`);

    const DeHubShopShippingAddresses = Moralis.Object.extend(
      MoralisClass.DeHubShopShippingAddresses
    );
    // Query if certain address is already registered
    const queryShippingAddress = new Moralis.Query(DeHubShopShippingAddresses);
    const queryUser = new Moralis.Query(Moralis.User);
    queryUser.equalTo('objectId', user.id);
    queryShippingAddress.matchesQuery('user', queryUser);
    const addresses = await queryShippingAddress.find({ useMasterKey: true });

    // If found already registered, then use it
    let deHubShopShippingAddresses = null;
    for (const address of addresses) {
      const contains = Object.keys(shippingAddress)
        .map((key: string) => {
          const value = shippingAddress[key] ?? '';
          const valueInDB = address.get(key) ?? '';
          return value.trim() === valueInDB.trim();
        })
        .reduce((prev: boolean, current: boolean) => prev && current, true);
      if (contains) {
        logger.info(`Address found.`);
        deHubShopShippingAddresses = addresses[0];
        break;
      }
    }

    if (deHubShopShippingAddresses === null) {
      deHubShopShippingAddresses = new DeHubShopShippingAddresses();
      deHubShopShippingAddresses.set('user', user);
      deHubShopShippingAddresses.set('city', shippingAddress.city);
      deHubShopShippingAddresses.set('state', shippingAddress.state);
      deHubShopShippingAddresses.set('country', shippingAddress.country);
      deHubShopShippingAddresses.set('postalCode', shippingAddress.postalCode);
      deHubShopShippingAddresses.set('line1', shippingAddress.line1);
      deHubShopShippingAddresses.set('line2', shippingAddress.line2);
      deHubShopShippingAddresses.set('name', shippingAddress.name);
      await deHubShopShippingAddresses.save(null, { useMasterKey: true });
    }

    // Creates a new DeHubShopOrders item with status IPFSUploading and contentfulId
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
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
    dehubShopOrders.set('imageIpfsHash', imageIpfsHash);
    await dehubShopOrders.save();

    return {
      ipfsHash,
      orderId: dehubShopOrders.id,
    };
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Shop.InitOrder} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findOrder = async (orderId: string): Promise<any | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const query = new Moralis.Query(DeHubShopOrders);
    query.equalTo('objectId', orderId);
    const result = await query.first();
    if (!result) return null;
    return result;
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Shop.InitOrder} error: ${JSON.stringify(err)}`
    );
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
    logger.error(
      `${MoralisFunctions.Shop.InitOrder} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};

export const getCheckoutContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const redisClient = new RedisClient();
    await redisClient.connect();
    return JSON.parse(
      await redisClient.getExpired(
        MoralisFunctions.Shop.GetCheckoutContract,
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
      `${MoralisFunctions.Shop.GetCheckoutContract} error: ${JSON.stringify(
        err
      )}`
    );
    return null;
  }
};
