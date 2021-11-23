interface WindowChain {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: unknown[]) => void;
  };
}
