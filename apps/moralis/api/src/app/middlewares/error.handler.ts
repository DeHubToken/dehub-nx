import { MoralisError } from '@moralisweb3/core';
import { NextFunction, Request, Response } from 'express';

const makeMoralisErrorMessage = (error: MoralisError) => {
  let message = error.message || 'Unknown error';

  const errorResponse = error.details?.response;

  const errorResponseData =
    typeof errorResponse === 'object'
      ? (error.details?.response as Record<string, Error | { error: string }>)
          .data
      : null;

  if (errorResponseData) {
    // Handle MoralisError
    if (errorResponseData instanceof Error) {
      const { name: errorName, message: errorMsg } = errorResponseData;
      message = `${errorName ? `${errorName}: ` : ''}${errorMsg}`;
    } else if (errorResponseData.error) {
      // Handle ParseError
      message = errorResponseData.error;
    }
  }

  return message;
};

export function errorHandler(
  error: Error | MoralisError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof MoralisError) {
    const status =
      typeof error.details?.status === 'number' ? error.details?.status : 500;
    const errorMessage = makeMoralisErrorMessage(error);

    res.status(status).json({ error: errorMessage });
  } else {
    res.status(500).json({ error: error.message });
  }
}
