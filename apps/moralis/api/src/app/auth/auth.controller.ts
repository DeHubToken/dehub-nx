import {
  AuthenticateRequest,
  RequestMessageRequest,
  RequestMessageResponse,
  VerifyMessageRequest,
  VerifyMessageResponse,
} from '@dehub/shared/model';
import { NextFunction, Request, Response } from 'express';
import { auth, requestMessage, verifyMessage } from './auth.service';

export const request = async (
  req: Request<RequestMessageRequest>,
  res: Response<RequestMessageResponse>,
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
  req: Request<VerifyMessageRequest>,
  res: Response<VerifyMessageResponse>,
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

export const authenticate = async (
  req: Request<AuthenticateRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const response = auth({ token });

    res.status(response.error ? 403 : 200).json(response);
  } catch (err) {
    next(err);
  }
};
