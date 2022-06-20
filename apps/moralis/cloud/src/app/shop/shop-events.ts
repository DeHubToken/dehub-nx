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
      const metadataURI = purchase.get('metadataURI');
      logger.info(
        `PurchaseEvent request.orderId,metadataURI: ${orderId}, ${metadataURI}`
      );

      // Find order by orderId
      const order = await findOrder(orderId);
      if (!order) {
        logger.error(`Not found order by id: ${orderId}`);
        return;
      }

      // Compare order and request
      const status = order.get('status');
      const ipfsHash = order.get('ipfsHash');

      if (status === OrderStatus.verifying && metadataURI === ipfsHash) {
        order.set('status', OrderStatus.verified);
        order.save();

        logger.info(`setOrderStatus(${orderId}, ${status}})`);
      } else {
        logger.error(
          `Not found order matched with ipfsHash: ${orderId}, ${ipfsHash}`
        );
      }
    } catch (err) {
      logger.error(`ShopPurchaseEvents error: ${JSON.stringify(err)}`);
      return;
    }
  }
);
