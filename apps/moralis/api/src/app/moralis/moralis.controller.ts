import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { NextFunction, Request, Response } from 'express';
import Moralis from 'moralis';

export const nativeBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: EvmAddress.create(`${req.query.address}`).lowercase,
      chain: EvmChain.ETHEREUM.name,
    });

    // Format the native balance formatted in ether via the .ether getter
    const native = nativeBalance.result.balance.ether;

    res.send(`ETH balance: ${native}`);
  } catch (err) {
    next(err);
  }
};
