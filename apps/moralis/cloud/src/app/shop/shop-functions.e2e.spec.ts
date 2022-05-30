require('../shared/mock.include');
import { Moralis } from 'moralis';
import { environment } from '../../environments/environment';
import { OrderStatus, ShopFunctions } from './shop.model';

const { moralis } = environment;

describe('E2E Shop functions', () => {
  beforeAll(async () => await Moralis.start(moralis));

  it('Should add new order', async () => {
    const res = await Moralis.Cloud.run(ShopFunctions.InitOrder, {
      address: '0x91573f05f34aaf59ec4849860e61c3762906978e',
      productData: JSON.stringify({
        picture: 'picture',
        name: 'name',
        shortDescription: 'shortDescription',
        fullDescription: 'fullDescription',
        category: 1,
        deliveryCountry: 'deliveryCountry',
        price: '100000',
        currency: 'DeHub',
        sku: 'sku',
        availableQuantity: 1,
      }),
      shippingAddress: JSON.stringify({
        city: 'city',
        state: 'state',
        country: 'country',
        postalCode: 'postalCode',
        line1: 'line1',
        line2: 'line2',
        name: 'productName',
      }),
      contentfulId: 'contentfulId',
    });
    expect(res).not.toBeNull;
    expect(res.ipfsHash).toBeDefined;
    expect(res.orderId).toBeDefined;

    // Check if Order is added successfully
    const DeHubShopOrders = Moralis.Object.extend('DeHubShopOrders');
    const queryOrders = new Moralis.Query(DeHubShopOrders);
    queryOrders.equalTo('objectId', res.orderId);
    const order = await queryOrders.first();
    expect(order).toBeDefined;

    // Check if ShippingAddresss is added successfully
    const shippingAddressAbstract = order.get('shippingAddress');
    const shippingAddressId = shippingAddressAbstract.id;

    const DeHubShopShippingAddresses = Moralis.Object.extend(
      'DeHubShopShippingAddresses'
    );
    const queryAddress = new Moralis.Query(DeHubShopShippingAddresses);
    queryAddress.equalTo('objectId', shippingAddressId);
    const shippingAddress = await queryAddress.first();
    expect(shippingAddress).toBeDefined;

    // Destroy ShippingAddress object
    await shippingAddress.destroy();

    // Destroy Order object
    await order.destroy();
  });

  it('Should check order status', async () => {
    const resOrder = await Moralis.Cloud.run(ShopFunctions.InitOrder, {
      address: '0x91573f05f34aaf59ec4849860e61c3762906978e',
      productData: JSON.stringify({
        picture: 'picture',
        name: 'name',
        shortDescription: 'shortDescription',
        fullDescription: 'fullDescription',
        category: 1,
        deliveryCountry: 'deliveryCountry',
        price: '100000',
        currency: 'DeHub',
        sku: 'sku',
        availableQuantity: 1,
      }),
      shippingAddress: JSON.stringify({
        city: 'city',
        state: 'state',
        country: 'country',
        postalCode: 'postalCode',
        line1: 'line1',
        line2: 'line2',
        name: 'productName',
      }),
      contentfulId: 'contentfulId',
    });
    expect(resOrder).not.toBeNull;
    expect(resOrder.ipfsHash).toBeDefined;
    expect(resOrder.orderId).toBeDefined;

    const resStatus = await Moralis.Cloud.run(ShopFunctions.CheckOrder, {
      orderId: resOrder.orderId,
    });
    expect(resStatus).toEqual(OrderStatus.verifying);

    // Check if Order is added successfully
    const DeHubShopOrders = Moralis.Object.extend('DeHubShopOrders');
    const queryOrders = new Moralis.Query(DeHubShopOrders);
    queryOrders.equalTo('objectId', resOrder.orderId);
    const order = await queryOrders.first();
    expect(order).toBeDefined;

    // Check if ShippingAddresss is added successfully
    const shippingAddressAbstract = order.get('shippingAddress');
    const shippingAddressId = shippingAddressAbstract.id;

    const DeHubShopShippingAddresses = Moralis.Object.extend(
      'DeHubShopShippingAddresses'
    );
    const queryAddress = new Moralis.Query(DeHubShopShippingAddresses);
    queryAddress.equalTo('objectId', shippingAddressId);
    const shippingAddress = await queryAddress.first();
    expect(shippingAddress).toBeDefined;

    // Destroy ShippingAddress object
    await shippingAddress.destroy();

    // Destroy Order object
    await order.destroy();
  });
});
