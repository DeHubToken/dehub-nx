import { Env, environmentProd } from '@dehub/shared/config';

export const environment: Env = { ...environmentProd, baseUrl: '/web' };
