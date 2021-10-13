/*
 * This file can be replaced during build by using the `fileReplacements` array.
 * When building for production, this file is replaced with `environment.prod.ts`.
 */

import { ChainId } from '@dehub/shared/config';

export const environment = {
  production: false,
  chainId: ChainId.BSC_TESTNET
};
