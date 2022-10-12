require('../shared/mock.include');
import {
  InitOrderParams,
  InitOrderResult,
  MoralisClass,
  MoralisFunctions,
  OrderStatus,
} from '@dehub/shared/model';
import { Moralis } from 'moralis';
import { environment } from '../../environments/environment';

const { moralis } = environment;

describe('E2E Shop functions', () => {
  const config = {
    // wallet address and auth information should be matched in `_User` table
    address: '0x91573f05f34aaf59ec4849860e61c3762906978e',
    login: {
      username: 'ben_test1',
      password: 'ben_test1',
    },
  };

  beforeAll(async () => {
    await Moralis.start(moralis);

    // User should login to find shipping address which has permission by user
    await Moralis.User.logIn(config.login.username, config.login.password);
  });

  it('Should add new order with referral address', async () => {
    const address = config.address;
    const referralAddress = '0x91573f05f34aaf59ec4849860e61c3762906978e';
    const res: InitOrderResult | null = await Moralis.Cloud.run(
      MoralisFunctions.Shop.InitOrder,
      {
        address,
        referralAddress,
        productData: {
          image:
            'https://moralis.io/wp-content/uploads/2021/06/Moralis-Glass-Favicon.svg',
          name: 'name',
          sku: 'sku',
        },
        shippingAddress: {
          city: 'San Francisco',
          state: 'California',
          country: 'US',
          postalCode: '94116',
          line1: '2079 46th ave',
          line2: 'line2',
          name: 'Ben Weider',
        },
        contentfulId: 'contentfulId',
        quantity: 1,
        totalAmount: 100,
        currency: 'BUSD',
      } as InitOrderParams
    );
    expect(res).not.toBeNull;
    expect(res.ipfsHash).toBeDefined;
    expect(res.orderId).toBeDefined;

    // Check if Order is added successfully
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const queryOrders = new Moralis.Query(DeHubShopOrders);
    queryOrders.equalTo('objectId', res.orderId);
    const order = await queryOrders.first();
    expect(order).toBeDefined;
    expect(order.attributes['referralAddress']).toEqual(referralAddress);

    // Check if ShippingAddress is added successfully
    const shippingAddressAbstract = order.get('shippingAddress');
    const shippingAddressId = shippingAddressAbstract.id;

    const DeHubShopShippingAddresses = Moralis.Object.extend(
      MoralisClass.DeHubShopShippingAddresses
    );
    const queryAddress = new Moralis.Query(DeHubShopShippingAddresses);
    queryAddress.equalTo('objectId', shippingAddressId);
    const shippingAddress = await queryAddress.first();
    expect(shippingAddress).toBeDefined;

    // Destroy Order object
    await order.destroy();
  });

  it('Should add new order without referral address', async () => {
    const address = config.address;
    const referralAddress = undefined;
    const res: InitOrderResult | null = await Moralis.Cloud.run(
      MoralisFunctions.Shop.InitOrder,
      {
        address,
        referralAddress,
        productData: {
          image:
            'https://moralis.io/wp-content/uploads/2021/06/Moralis-Glass-Favicon.svg',
          name: 'name',
          sku: 'sku',
        },
        shippingAddress: {
          city: 'San Francisco',
          state: 'California',
          country: 'US',
          postalCode: '94116',
          line1: '2079 46th ave',
          line2: 'line2',
          name: 'Ben Weider',
        },
        contentfulId: 'contentfulId',
        quantity: 1,
        totalAmount: 100,
        currency: 'BUSD',
      } as InitOrderParams
    );
    expect(res).not.toBeNull;
    expect(res.ipfsHash).toBeDefined;
    expect(res.orderId).toBeDefined;

    // Check if Order is added successfully
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const queryOrders = new Moralis.Query(DeHubShopOrders);
    queryOrders.equalTo('objectId', res.orderId);
    const order = await queryOrders.first();
    expect(order).toBeDefined;
    expect(order.attributes['referralAddress']).toEqual('');

    // Check if ShippingAddress is added successfully
    const shippingAddressAbstract = order.get('shippingAddress');
    const shippingAddressId = shippingAddressAbstract.id;

    const DeHubShopShippingAddresses = Moralis.Object.extend(
      MoralisClass.DeHubShopShippingAddresses
    );
    const queryAddress = new Moralis.Query(DeHubShopShippingAddresses);
    queryAddress.equalTo('objectId', shippingAddressId);
    const shippingAddress = await queryAddress.first();
    expect(shippingAddress).toBeDefined;

    // Destroy Order object
    await order.destroy();
  });

  it('Should check order status', async () => {
    const resOrder: InitOrderResult | null = await Moralis.Cloud.run(
      MoralisFunctions.Shop.InitOrder,
      {
        address: config.address,
        productData: {
          image:
            'https://moralis.io/wp-content/uploads/2021/06/Moralis-Glass-Favicon.svg',
          name: 'name',
          sku: 'sku',
        },
        shippingAddress: {
          city: 'San Francisco',
          state: 'California',
          country: 'US',
          postalCode: '94116',
          line1: '2079 46th ave',
          line2: 'line2',
          name: 'Ben Weider',
        },
        contentfulId: 'contentfulId',
        quantity: 1,
        totalAmount: 100,
        currency: 'BUSD',
      } as InitOrderParams
    );
    expect(resOrder).not.toBeNull;
    expect(resOrder.ipfsHash).toBeDefined;
    expect(resOrder.orderId).toBeDefined;

    const resStatus = await Moralis.Cloud.run(
      MoralisFunctions.Shop.CheckOrder,
      {
        orderId: resOrder.orderId,
      }
    );
    expect(resStatus).toEqual(OrderStatus.verifying);

    // Check if Order is added successfully
    const DeHubShopOrders = Moralis.Object.extend(MoralisClass.DeHubShopOrders);
    const queryOrders = new Moralis.Query(DeHubShopOrders);
    queryOrders.equalTo('objectId', resOrder.orderId);
    const order = await queryOrders.first();
    expect(order).toBeDefined;

    // Check if ShippingAddress is added successfully
    const shippingAddressAbstract = order.get('shippingAddress');
    const shippingAddressId = shippingAddressAbstract.id;

    const DeHubShopShippingAddresses = Moralis.Object.extend(
      MoralisClass.DeHubShopShippingAddresses
    );
    const queryAddress = new Moralis.Query(DeHubShopShippingAddresses);
    queryAddress.equalTo('objectId', shippingAddressId);
    const shippingAddress = await queryAddress.first();
    expect(shippingAddress).toBeDefined;

    // Destroy Order object
    await order.destroy();
  });
});
