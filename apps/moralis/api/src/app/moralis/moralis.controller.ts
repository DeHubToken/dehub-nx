import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { NextFunction, Request, Response } from 'express';
import Moralis from 'moralis';

/**
 * Get Native balance
 * Docs: https://docs.moralis.io/web3-data-api/integrations/aws-lambda-nodejs#create-getnativebalance-endpoint
 */
export const nativeBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: EvmAddress.create(`${req.query.address}`).lowercase,
      chain: EvmChain.ETHEREUM.hex,
    });

    // Format the native balance formatted in ether via the .ether getter
    const native = nativeBalance.result.balance.ether;

    res.send(`ETH balance: ${native}`);
  } catch (err) {
    next(err);
  }
};
