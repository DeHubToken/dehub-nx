import { MoralisFunctions } from '@dehub/shared/model';

export const totalCirculatingSupplyFn = async () => {
  const ABI = [
    {
      inputs: [],
      name: MoralisFunctions.Dehub.TotalCirculatingSupply,
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
    address: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
    function_name: 'totalSupply',
    // Moralis TS Issue: https://forum.moralis.io/t/react-runcontractfunction-error-codes/4228/25
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    abi: ABI,
  });

  return +data / 1e5;
};
