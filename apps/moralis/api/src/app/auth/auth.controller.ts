import { NextFunction, Request, Response } from 'express';
import { requestMessage, verifyMessage } from './auth.service';

export const request = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { address, chain, networkType } = req.body;

    const response = await requestMessage({
      address,
      chain,
      networkType,
    });

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { networkType, message, signature } = req.body;

    const response = await verifyMessage({
      networkType,
      message,
      signature,
    });

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
