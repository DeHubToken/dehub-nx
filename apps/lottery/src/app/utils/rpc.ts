import { environment } from '../../environments/environment';

const getRpcUrl = () => {
  return environment.production ?
    'https://bsc-dataseed1.defibit.io/' :
    'https://data-seed-prebsc-2-s1.binance.org:8545/';
}

export default getRpcUrl;