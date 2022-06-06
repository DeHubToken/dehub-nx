import { environment } from '../../environments/environment';
import { compareCurrency, findOrder } from './shop-functions';
import { OrderStatus } from './shop.model';

Moralis.Cloud.afterSave(
  environment.shop.eventTables.purchase,
  async request => {
    const logger = Moralis.Cloud.getLogger();
    try {
      const { object: purchase } = request;
      const orderId = purchase.get('orderId');
      const currencyIn = Number(purchase.get('currency'));

      // Find order by orderId
      const order = await findOrder(orderId);
      if (!order) return;

      // Compare order and request
      const status = order.get('status');
      const currency = order.get('currency');

      if (
        status === OrderStatus.verifying &&
        compareCurrency(currencyIn, currency)
      ) {
        order.set('status', OrderStatus.verified);
        order.save();

        logger.info(`setOrderStatus(${orderId}, ${status}})`);
      }
    } catch (err) {
      logger.error(`ShopPurchaseEvents error: ${JSON.stringify(err)}`);
      return;
    }
  }
);
