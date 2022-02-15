import { Networks } from '@dehub/shared/config';
import { getRandomRpcUrl } from '@dehub/shared/util';
import { environment } from '../../environments/environment';

// Array of available nodes to connect to
export const { nodes } = Networks[environment.web3.chainId];

const getRpcUrl = () => getRandomRpcUrl(nodes);

export default getRpcUrl;
