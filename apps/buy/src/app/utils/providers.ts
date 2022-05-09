import { Networks } from '@dehub/shared/config';
import { getRandomRpcUrl } from '@dehub/shared/utils';
import { JsonRpcProvider } from '@ethersproject/providers';
import { environment } from '../../environments/environment';

// Array of available nodes to connect to
const { moralisNodes, nodes } = Networks[environment.web3.chainId];

const getRpcUrl = () => getRandomRpcUrl([...moralisNodes, ...nodes]);

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new JsonRpcProvider(RPC_URL);
