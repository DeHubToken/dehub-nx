import {
  ChainId,
  MoralisFunctions,
  nullAddress,
  Stats,
} from '@dehub/shared/model';
import { getBalanceAmount } from '@dehub/shared/utils';
import { environment } from '../../environments/environment';

export const totalSupplyFn = async (): Promise<Stats> => {
  const {
    production,
    web3: {
      addresses: {
        contracts: { dehubBsc, dehubEth, dehubPolygon },
      },
    },
  } = environment;

  const bscChain: ChainId = production ? 'bsc' : 'bsc testnet';
  const ethChain: ChainId = production ? 'eth' : 'goerli';
  const polygonChain: ChainId = production ? 'polygon' : 'mumbai';

  // Total Supply
  const bsc = await getTotalSupply(bscChain, dehubBsc);
  const eth = await getTotalSupply(ethChain, dehubEth);
  const polygon = await getTotalSupply(polygonChain, dehubPolygon);

  // Token Burned
  const bscBurned = await getBalanceOf(bscChain, dehubBsc, nullAddress);
  const ethBurned = await getBalanceOf(ethChain, dehubEth, nullAddress);
  const polygonBurned = await getBalanceOf(
    polygonChain,
    dehubPolygon,
    nullAddress
  );

  return {
    totalSupply: { bsc, eth, polygon },
    totalBurned: { bsc: bscBurned, eth: ethBurned, polygon: polygonBurned },
    activeSupply: {
      bsc: bsc - bscBurned,
      eth: eth - ethBurned,
      polygon: polygon - polygonBurned,
    },
  };
};

const getTotalSupply = async (chain: ChainId, address: string) => {
  const totalSupply = await Moralis.Web3API.native.runContractFunction({
    chain,
    address,
    function_name: MoralisFunctions.Dehub.TotalSupply,
    // Moralis TS Issue: https://forum.moralis.io/t/react-runcontractfunction-error-codes/4228/25
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    abi: [
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
    ],
  });

  return getBalanceAmount(totalSupply).toNumber();
};

const getBalanceOf = async (
  chain: ChainId,
  address: string,
  account: string
) => {
  const ABI = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'balanceOf',
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

  const balance = await Moralis.Web3API.native.runContractFunction({
    chain,
    address,
    function_name: 'balanceOf',
    // Moralis TS Issue: https://forum.moralis.io/t/react-runcontractfunction-error-codes/4228/25
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    abi: ABI,
    params: { account },
  });

  return getBalanceAmount(balance).toNumber();
};
