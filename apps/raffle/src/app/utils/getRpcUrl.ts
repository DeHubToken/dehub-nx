import random from 'lodash/random';
import { environment } from '../../environments/environment';

// Array of available nodes to connect to
export const nodes = environment.bscNodes;

const getRpcUrl = () => {
  const randomIndex = random(0, nodes.length - 1);
  return nodes[randomIndex];
};

export default getRpcUrl;
