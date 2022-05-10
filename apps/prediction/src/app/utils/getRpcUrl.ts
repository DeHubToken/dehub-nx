import { Networks } from '@dehub/shared/config';
import { getRandomRpcUrl } from '@dehub/shared/utils';
import { environment } from '../../environments/environment';

// Array of available nodes to connect to
export const { moralisNodes, nodes } = Networks[environment.web3.chainId];

const getRpcUrl = () => getRandomRpcUrl([...moralisNodes, ...nodes]);

export default getRpcUrl;
