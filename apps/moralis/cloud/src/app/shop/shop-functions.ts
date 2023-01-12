import {
  DeHubShopOrder,
  InitOrderParams,
  InitOrderResult,
  MoralisClass,
  MoralisFunctions,
  MoralisUser,
  OrderStatus,
  PhysicalAddress,
  ShopOrdersParams,
} from '@dehub/shared/model';
import { emptyPhysicalAddress } from '@dehub/shared/utils';
import { environment } from '../../environments/environment';
import { ChainIdAsNumber, isMoralisUserByAddress } from '../shared';
import { getCheckoutContract } from './shop.util';

export const initOrder = async ({
  address,
  referralAddress,
  productData,
  shippingAddress,
  contentfulId,
  quantity,
  totalAmount,
  currency,
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

    // Save Shipping address
    const savedShippingAddress = await upsertShippingAddress(
      user,
      shippingAddress
    );

    // Creates a new DeHubShopOrders item with status IPFSUploading and contentfulId
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const dehubShopOrders = new DeHubShopOrders();
    dehubShopOrders.set('ipfsHash', ipfsHash);
    dehubShopOrders.set('shippingAddress', savedShippingAddress);
    dehubShopOrders.set('referralAddress', referralAddress);
    dehubShopOrders.set('user', user);
    dehubShopOrders.set('status', OrderStatus.verifying);
    // tokenId should be updated after minting NFT
    dehubShopOrders.set('tokenId', 0);
    dehubShopOrders.set('productName', productData.name);
    dehubShopOrders.set('sku', productData.sku);
    dehubShopOrders.set('contentfulId', contentfulId);
    dehubShopOrders.set('imageIpfsHash', imageIpfsHash);
    dehubShopOrders.set('quantity', quantity);
    dehubShopOrders.set('totalAmount', totalAmount);
    dehubShopOrders.set('currency', currency);

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

/**
 * Persist Shipping Address.
 *
 * - Save: if address is new for the user
 * - Update: if address was already set
 * - Save 'empty': if address were not provided
 */
const upsertShippingAddress = async (
  user: MoralisUser,
  shippingAddress?: PhysicalAddress
) => {
  const DeHubShopShippingAddresses = Moralis.Object.extend(
    MoralisClass.DeHubShopShippingAddresses
  );
  // Query if certain address is already registered
  const queryShippingAddress = new Moralis.Query(DeHubShopShippingAddresses);
  const queryUser = new Moralis.Query(Moralis.User);
  queryUser.equalTo('objectId', user.id);
  queryShippingAddress.matchesQuery('user', queryUser);
  const addresses = await queryShippingAddress.find({ useMasterKey: true });

  // Update shipping address fields
  shippingAddress = shippingAddress ?? emptyPhysicalAddress();
  const deHubShopShippingAddresses =
    addresses.length > 0 ? addresses[0] : new DeHubShopShippingAddresses();
  deHubShopShippingAddresses.set('user', user);
  deHubShopShippingAddresses.set('city', shippingAddress.city);
  deHubShopShippingAddresses.set('state', shippingAddress.state);
  deHubShopShippingAddresses.set('country', shippingAddress.country);
  deHubShopShippingAddresses.set('postalCode', shippingAddress.postalCode);
  deHubShopShippingAddresses.set('line1', shippingAddress.line1);
  deHubShopShippingAddresses.set('line2', shippingAddress.line2);
  deHubShopShippingAddresses.set('name', shippingAddress.name);

  const savedAddress = await deHubShopShippingAddresses.save(null, {
    useMasterKey: true,
  });

  return savedAddress;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findOrder = async (
  orderId: string
): Promise<DeHubShopOrder | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const query = new Moralis.Query<DeHubShopOrder>(DeHubShopOrders);
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

export const shopOrders = async ({
  contentfulId,
  orderStatus,
}: ShopOrdersParams): Promise<DeHubShopOrder[] | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const query = new Moralis.Query<DeHubShopOrder>(DeHubShopOrders);
    query.include('user');
    query.equalTo('contentfulId', contentfulId);
    query.equalTo('status', orderStatus);

    const result = await query.find({ useMasterKey: true });
    return result;
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Shop.ShopOrders} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};

export const getCheckoutContractFn = async () => {
  const logger = Moralis.Cloud.getLogger();
  try {
    return await getCheckoutContract(
      environment.web3.chainId as ChainIdAsNumber
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
