import { OrderStatus } from '@dehub/shared/model';
import { environment } from '../../environments/environment';
import { findOrder } from './shop-functions';

Moralis.Cloud.afterSave(
  environment.shop.eventTables.purchase,
  async request => {
    const logger = Moralis.Cloud.getLogger();
    try {
      const { object: purchase } = request;
      const orderId = purchase.get('orderId');
      const metadataURI = Number(purchase.get('metadataURI'));

      // Find order by orderId
      const order = await findOrder(orderId);
      if (!order) return;

      // Compare order and request
      const status = order.get('status');
      const contentfulId = order.get('contentfulId');

      if (status === OrderStatus.verifying && metadataURI === contentfulId) {
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
