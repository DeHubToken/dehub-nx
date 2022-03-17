// https://vamoxwojj7ht.moralisweb3.com:2053/server/functions/totalCirculatingSupply?_AplicationId=QfgYJskOXrYJnSAiB3KZPMMesmlJB6JBqY3GOzHV
Moralis.Cloud.define('totalCirculatingSupply', async _request => {
  const ABI = [
    {
      inputs: [],
      name: 'totalCirculatingSupply',
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
    function_name: 'totalCirculatingSupply',
    // Moralis TS Issue: https://forum.moralis.io/t/react-runcontractfunction-error-codes/4228/25
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    abi: ABI,
  });

  return +data / 1e5;
});
