import { MoralisFunctions } from '@dehub/shared/model';

export const totalSupplyFn = async () => {
  const ABI = [
    {
      inputs: [],
      name: MoralisFunctions.Dehub.TotalSupply,
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const data = await Moralis.Web3API.native.runContractFunction({
    chain: 'bsc',
    address: '0x680D3113caf77B61b510f332D5Ef4cf5b41A761D',
    function_name: MoralisFunctions.Dehub.TotalSupply,
    // Moralis TS Issue: https://forum.moralis.io/t/react-runcontractfunction-error-codes/4228/25
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    abi: ABI,
  });

  return +data / 1e5;
};
