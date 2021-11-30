import tokens from './tokens';
import { FarmConfig } from './types';

const farms: FarmConfig[] = [
  {
    pid: 252,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xe0e92035077c39594793e61802a350347c320cf2', // the pid of the testnet is not 252
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
];

export default farms;
