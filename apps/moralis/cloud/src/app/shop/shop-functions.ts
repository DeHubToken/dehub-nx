import {
  AirdropReferral,
  DeHubShopOrder,
  InitOrderParams,
  InitOrderResult,
  MoralisClass,
  MoralisFunctions,
  MoralisUser,
  OrderStatus,
  PhysicalAddress,
  SalesAirdrop,
  SalesAirdropFormat,
  SalesAirdropParams,
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
    query.descending('updatedAt');

    const result = await query.find({ useMasterKey: true });
    return result;
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Shop.ShopOrders} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};

export const salesAirdrop = async ({
  orderStatus = OrderStatus.verified,
  aggregate = false,
  airdropFormat = false,
}: SalesAirdropParams): Promise<
  SalesAirdrop[] | SalesAirdropFormat[] | null
> => {
  const logger = Moralis.Cloud.getLogger();

  logger.info(`orderStatus: ${orderStatus}, aggregate: ${aggregate}`);

  // Relevant NFTs for Airdrops (public)
  const pubLegendNFT = '3qSWZCVebyqIWBZW57KAg';
  const pubHeroNFT = '2KBxICRPg35FeZ7bHUjdEy';
  const pubSoldierNFT = '7GF9nt7rkMotpqZuf0kgbC';
  const pubMythicNFT = '3kQ3HVQx10NPmkuQxUYSfr';

  // Relevant NFTs for Airdrops (private)
  const privLegendNFT = '5vm9CpfkSKrNAxQM96G27L';
  const privHeroNFT = '4xJtOrEbw4iAkOsTA7v0cp';
  const privSoldierNFT = '2uTmXzmmETIXTMoNXLUuTG';
  const privMythicNFT = '4WqjauLmCpizNFt12MR5tz';

  try {
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const query = new Moralis.Query<DeHubShopOrder<MoralisUser> & SalesAirdrop>(
      DeHubShopOrders
    );
    query.include('user');
    query.containedIn('contentfulId', [
      pubLegendNFT,
      pubHeroNFT,
      pubSoldierNFT,
      pubMythicNFT,
      privLegendNFT,
      privHeroNFT,
      privSoldierNFT,
      privMythicNFT,
    ]);

    query.equalTo('status', orderStatus);
    query.descending('updatedAt');
    query.limit(2000);

    const shopOrders = await query.find({ useMasterKey: true });

    const airdrops: SalesAirdrop[] = shopOrders.map(
      ({
        attributes: {
          quantity,
          totalAmount,
          referralAddress,
          contentfulId,
          user: {
            id: userId,
            attributes: { ethAddress },
          },
        },
      }) => {
        const nft =
          contentfulId === pubLegendNFT
            ? 'legend (pub)'
            : contentfulId === pubHeroNFT
            ? 'hero (pub)'
            : contentfulId === pubSoldierNFT
            ? 'soldier (pub)'
            : contentfulId === pubMythicNFT
            ? 'mythic (pub)'
            : contentfulId === privLegendNFT
            ? 'legend (priv)'
            : contentfulId === privHeroNFT
            ? 'hero (priv)'
            : contentfulId === privSoldierNFT
            ? 'soldier (priv)'
            : contentfulId === privMythicNFT
            ? 'mythic (priv)'
            : '<ISSUE>';

        const airdrop = (quantity * totalAmount) / 0.0008;

        return {
          userId,
          ethAddress,
          nft,
          airdrop,
          ...(referralAddress && {
            referrals: [
              { ethAddress: referralAddress, airdrop: airdrop * 0.1, nft },
            ],
          }),
        };
      }
    );

    if (!aggregate) return airdrops;

    const mergeReferrals = (
      currentReferrals: AirdropReferral[],
      newReferrals: AirdropReferral[]
    ): AirdropReferral[] =>
      newReferrals.reduce((prevReferrals, actNewReferral) => {
        const referralIndexToUpdate = prevReferrals.findIndex(
          ({ ethAddress }) =>
            ethAddress.toLowerCase() === actNewReferral.ethAddress.toLowerCase()
        );
        // Address already exists, update
        if (referralIndexToUpdate !== -1) {
          const referralToUpdate = prevReferrals[referralIndexToUpdate];

          const updatedReferral: AirdropReferral = {
            ...referralToUpdate,
            // Add new airdrop amount
            airdrop: (referralToUpdate.airdrop += actNewReferral.airdrop),
          };
          return [
            ...prevReferrals.slice(0, referralIndexToUpdate),
            updatedReferral,
            ...prevReferrals.slice(referralIndexToUpdate + 1),
          ];
        }
        // Append the new referral
        return [...prevReferrals, actNewReferral];
      }, currentReferrals);

    // Merge same ethAddresses amounts and referral amounts
    const aggregatedAirdrops = airdrops.reduce((prevAirdrops, actAirdrop) => {
      const airdropIndexToUpdate = prevAirdrops.findIndex(
        ({ ethAddress }) =>
          ethAddress.toLowerCase() === actAirdrop.ethAddress.toLowerCase()
      );
      // Address already exists, update
      if (airdropIndexToUpdate !== -1) {
        const airdropToUpdate = prevAirdrops[airdropIndexToUpdate];

        const updatedAirdrop: SalesAirdrop = {
          ...airdropToUpdate,
          // Append which nft was purchased
          nft: (airdropToUpdate.nft += `, ${actAirdrop.nft}`),
          // Add new airdrop amount
          airdrop: (airdropToUpdate.airdrop += actAirdrop.airdrop),
          // Append new referrals
          ...((airdropToUpdate.referrals || actAirdrop.referrals) && {
            referrals: (airdropToUpdate.referrals && actAirdrop.referrals
              ? mergeReferrals(airdropToUpdate.referrals, actAirdrop.referrals)
              : airdropToUpdate.referrals && !actAirdrop.referrals
              ? airdropToUpdate.referrals
              : actAirdrop.referrals) as AirdropReferral[],
          }),
        };
        return [
          ...prevAirdrops.slice(0, airdropIndexToUpdate),
          updatedAirdrop,
          ...prevAirdrops.slice(airdropIndexToUpdate + 1),
        ];
      }
      // Append the new airdrop
      return [...prevAirdrops, actAirdrop];
    }, [] as SalesAirdrop[]);

    // Filter out referrals which referred himself
    const aggregatedFilteredAirdrops = aggregatedAirdrops.map(airdrop => {
      const filteredReferrals: AirdropReferral[] | undefined = airdrop.referrals
        ? airdrop.referrals.filter(
            ({ ethAddress: referralEthAddress }) =>
              referralEthAddress.toLowerCase() !==
              airdrop.ethAddress.toLowerCase()
          )
        : undefined;

      // Delete key if nothing remains
      delete airdrop.referrals;

      return {
        ...airdrop,
        ...(filteredReferrals &&
          filteredReferrals.length > 0 && { referrals: filteredReferrals }),
      };
    });

    // Flatten referral addresses
    const aggregatedFilteredFlattenedAirdrops =
      aggregatedFilteredAirdrops.reduce((prevAirdrops, actAirdrop) => {
        if (actAirdrop.referrals) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { referrals, ...actAirdropWithoutReferrals } = actAirdrop;
          return [
            ...prevAirdrops,
            actAirdropWithoutReferrals,
            ...actAirdrop.referrals.map(({ ethAddress, airdrop, nft }) => ({
              userId: `${actAirdrop.userId} referral`,
              ethAddress,
              nft,
              airdrop,
            })),
          ];
        } else {
          return [...prevAirdrops, actAirdrop];
        }
      }, [] as SalesAirdrop[]);

    if (!airdropFormat) return aggregatedFilteredFlattenedAirdrops;

    /**
       Airdrop format

        "0xB3B720a3491e97c91b49E5E8279BaEe4eB6eF561": {
          "address": "0xB3B720a3491e97c91b49E5E8279BaEe4eB6eF561",
          "amount": "203238114201"
        }
      */
    const aggregatedFilteredFlattenedAirdropsFormat: SalesAirdropFormat[] =
      aggregatedFilteredFlattenedAirdrops.map(
        ({ ethAddress: address, airdrop: amount }) => ({
          [`${address}`]: { address, amount: `${amount}` },
        })
      );

    return aggregatedFilteredFlattenedAirdropsFormat;
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Shop.SalesAirdrop} error: ${JSON.stringify(err)}`
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
