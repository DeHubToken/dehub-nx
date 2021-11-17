import { Method } from 'web3-core-method';
import { getWeb3NoAccount } from './web3';

/**
 * Accepts an array of contract method calls and batches them
 *
 * Example:
 *
 * [
 *  contract.method.balanceOf().call,
 *  contract.method.startBlockNumber().call
 * ]
 */

export interface Call {
  request: (
    argument1: Record<string, unknown>,
    argument2: (err: Error, result: string) => void
  ) => Method;
}
const makeBatchRequest = (calls: Call[]) => {
  try {
    const web3 = getWeb3NoAccount();
    const batch = new web3.BatchRequest();

    const promises = calls.map((call: Call) => {
      return new Promise((resolve, reject) => {
        batch.add(
          call.request({}, (err: Error, result: string) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          })
        );
      });
    });

    batch.execute();

    return Promise.all(promises);
  } catch {
    return null;
  }
};

export default makeBatchRequest;
