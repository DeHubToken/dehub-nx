/*******************************************************
 * Prerequirements
 *
 * Add new column in _User table of Moralis Database
 * 1. `can_play`
 * type Boolean
 *
 ******************************************************/

const BSC_MAINNET = '0x38';
const BSC_TESTNET = '0x61';

const chainId = BSC_TESTNET;
/*******************************************************
 * Define constants, will depend on `chainId`
 ******************************************************/
const ConfigFields = {
  [BSC_MAINNET]: {
    StakingAbi: 'DEHUB_STAKING_ABI_MAINNET',
    StakingAddress: 'DEHUB_STAKING_MAINNET',
    TokenAbi: 'DEHUB_TOKEN_ABI_MAINNET',
    TokenAddress: 'DEHUB_TOKEN_MAINNET',
  },
  [BSC_TESTNET]: {
    StakingAbi: 'DEHUB_STAKING_ABI_TESTNET',
    StakingAddress: 'DEHUB_STAKING_TESTNET',
    TokenAbi: 'DEHUB_TOKEN_ABI_TESTNET',
    TokenAddress: 'DEHUB_TOKEN_TESTNET',
  },
  OTTMinTokens: 'OTT_MIN_TOKENS_TO_PLAY_NUMBER',
};
const DeHubTokenDecimals = new Moralis.Cloud.BigNumber(100000);

/*******************************************************
 * Moralis Configuration
 ******************************************************/
async function getOTTMinTokensToPlay() {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return new Moralis.Cloud.BigNumber(
      config.get(ConfigFields.OTTMinTokens)
    ).times(DeHubTokenDecimals);
  } catch (err) {
    logger.error(`getOTTMinTokensToPlay error: ${JSON.stringify(err)}`);
  }
  return null;
}

async function getDeHubTokenConfig(chainId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return {
      address: config.get(ConfigFields[chainId].TokenAddress),
      abi: config.get(ConfigFields[chainId].TokenAbi),
    };
  } catch (err) {
    logger.error(`getDeHubTokenConfig error: ${JSON.stringify(err)}`);
  }
  return null;
}

async function getDeHubStakingConfig(chainId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return {
      address: config.get(ConfigFields[chainId].StakingAddress),
      abi: config.get(ConfigFields[chainId].StakingAbi),
    };
  } catch (err) {
    logger.error(`getDeHubStakingConfig error: ${JSON.stringify(err)}`);
  }
  return null;
}

/*******************************************************
 * Query on Moralis Database
 ******************************************************/
/**
 * Get Moralis User by user's object id
 * @param {*} userObjectId
 * @returns user object if success, null if failed
 */
async function isMoralisUser(userObjectId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const query = new Moralis.Query(Moralis.User);
    query.equalTo('objectId', userObjectId);
    const users = await query.find({ useMasterKey: true });
    if (users && users.length > 0) {
      return users[0];
    }
  } catch (err) {
    logger.error(`isMoralisUser error: ${JSON.stringify(err)}`);
  }
  return null;
}

/**
 * Get Moralis User by wallet address
 * Moralis User has multiple wallet address, if contains given address,
 * will return
 * @param {*} address
 * @returns user object if success, null if failed
 */
async function isMoralisUserByAddress(address) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const query = new Moralis.Query(Moralis.User);
    query.contains('accounts', address);
    const users = await query.find({ useMasterKey: true });
    if (users && users.length > 0) {
      return users[0];
    }
  } catch (err) {
    logger.error(`isMoralisUserByAddress error: ${JSON.stringify(err)}`);
  }
  return null;
}

/*******************************************************
 * Contract integration
 ******************************************************/
/**
 * Get ERC20 token balance of given wallet address,
 * Of course, we can get it from `BscTokenBalance`
 * @param {*} chainId network
 * @param {*} address user address
 * @param {*} tokenAddress ERC20 token address
 * @returns amount in big number if success
 */
async function getTokenBalance(chainId, address, tokenAddress) {
  const logger = new Moralis.Cloud.getLogger();
  try {
    const accountTokens = await Moralis.Web3API.account.getTokenBalances({
      chain: chainId,
      address,
    });
    const filtered = accountTokens.filter(
      balance => balance.token_address === tokenAddress.toLowerCase()
    );
    return new Moralis.Cloud.BigNumber(filtered[0].balance);
  } catch (err) {
    logger.error(`getTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

async function getDeHubTokenBalance(chainId, address) {
  const logger = new Moralis.Cloud.getLogger();
  try {
    const config = await getDeHubTokenConfig(chainId);
    return getTokenBalance(chainId, address, config.address);
  } catch (err) {
    logger.error(`getDeHubTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

/**
 * Get staked token amount of given wallet address.
 * @param {*} chainId network
 * @param {*} address user address
 */
async function getStakedAmount(chainId, address) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await getDeHubStakingConfig(chainId);
    const web3 = Moralis.web3ByChain(chainId);
    // create contract instance
    const contract = new web3.eth.Contract(config.abi, config.address);
    // get user info
    const userInfo = await contract.methods.userInfo(address).call();
    return new Moralis.Cloud.BigNumber(userInfo.amount);
  } catch (err) {
    logger.error(`getStakedAmount error: ${JSON.stringify(err)}`);
    return null;
  }
}

/*******************************************************
 * Update on Moralis Database
 ******************************************************/
async function setCanPlay(user, value) {
  const logger = new Moralis.Cloud.getLogger();
  try {
    if (user) {
      logger.info(`setting can_play: ${JSON.stringify(user)}, ${value}`);
      user.set('can_play', value);
      await user.save(null, { useMasterKey: true }).then(user => {
        logger.info(
          `setCanPlay(${user.get('ethAddress')}, ${user.get('can_play')})`
        );
      });
    } else {
      logger.error('Not found Moralis User to set can_play');
    }
  } catch (err) {
    logger.error(`setCanPlay error: ${JSON.stringify(err)}`);
  }
}

/*******************************************************
 * Moralis Triggers
 ******************************************************/
/**
 * Update can_play according to the balance of holding and staking
 * @param {*} address user address
 */
async function updateCanPlay(address) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const user = await isMoralisUserByAddress(address);
    if (!user) {
      logger.error(`Not found Moralis User: ${address}`);
      return;
    }
    const balance = await getDeHubTokenBalance(chainId, address);
    logger.info(`user DeHub balance(${address}): ${balance.toString()}`);
    const staked = await getStakedAmount(chainId, address);
    logger.info(`user staked DeHub amount(${address}): ${staked.toString()}`);
    const total = balance.plus(staked);
    logger.info(`user total DeHub balance(${address}): ${total.toString()}`);

    const minAmount = await getOTTMinTokensToPlay();
    await setCanPlay(user, total.gte(minAmount) ? true : false);
  } catch (err) {
    logger.error(`updateCanPlay error: ${JSON.stringify(err)}`);
    return;
  }
}

/**
 * Subscribe the balance table, and if DeHub token balance has changed,
 * set `can_play` flag as true/false according to the holding balance.
 * The updates on this variable will automatically trigger calling to Allrites
 * so as to give an access to user
 */
Moralis.Cloud.afterSave('DeHubTokenTransferEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const fromAddress = request.object.get('from');
    const toAddress = request.object.get('to');
    logger.info(
      `Noticed DeHubTokenTransferEvents, from: ${fromAddress}, to: ${toAddress}`
    );

    await updateCanPlay(fromAddress);
    await updateCanPlay(toAddress);
  } catch (err) {
    logger.error(`DeHubTokenTransferEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingDepositEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingDepositEvents, address: ${address}`);

    await updateCanPlay(address);
  } catch (err) {
    logger.error(`DeHubStakingDepositEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingHarvestedEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingHarvestedEvents, address: ${address}`);

    await updateCanPlay(address);
  } catch (err) {
    logger.error(`DeHubStakingHarvestedEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingWithdrawEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingWithdrawEvents, address: ${address}`);

    await updateCanPlay(address);
  } catch (err) {
    logger.error(`DeHubStakingWithdrawEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

/*******************************************************
 * Test functions (on the local)
 ******************************************************/
// Moralis.Cloud.define('checkToken', async request => {
//   const logger = Moralis.Cloud.getLogger();
//   try {
//     const user = await isMoralisUser(request.params.objectId);
//     if (!user) {
//       logger.error(`Not found user: ${request.params.objectId}`);
//       return null;
//     }
//     logger.info(`Moralis user: ${JSON.stringify(user)}`);

//     logger.info(`passing address: ${user.get('ethAddress')}`);

//     const balance = await getDeHubBalance(user.get('ethAddress'));
//     const minAmount = await getOTTMinTokensToPlay();
//     if (!minAmount) {
//       logger.error('Failed to get OTT min tokens to play');
//       return;
//     }

//     logger.info(`balance(${user.get('ethAddress')}): ${balance.toString()}`);
//     logger.info(`DeHubTokenMinAmount: ${minAmount.toString()}`);

//     const canPlay = balance.gte(minAmount) ? true : false;
//     await setCanPlay(user, canPlay);
//     return canPlay;
//   } catch (err) {
//     logger.error(JSON.stringify(err));
//     return;
//   }
// });

// Moralis.Cloud.define('config', async request => {
//   const logger = Moralis.Cloud.getLogger();
//   try {
//     const minTokens = await getOTTMinTokensToPlay();
//     logger.info(`minTokens: ${minTokens.toString()}`);

//     const tokenConfig = await getDeHubTokenConfig(chainId);
//     logger.info(`tokenConfig: ${JSON.stringify(tokenConfig)}`);

//     const stakingConfig = await getDeHubStakingConfig(chainId);
//     logger.info(`stakingConfig: ${JSON.stringify(stakingConfig)}`);

//     return 0;
//   } catch (err) {
//     logger.error(JSON.stringify(err));
//     return;
//   }
// });

// https://github.com/talgoa/neo-tokyo-market/blob/8792d2a061fa972d2ae5162d702ad5bab7baaced/cloud/bytesContract.js

// Moralis.Cloud.define('balanceOf', async request => {
//   const logger = Moralis.Cloud.getLogger();
//   try {
//     const web3 = Moralis.web3ByChain('0x61');
//     const BytesABI = [
//       {
//         inputs: [
//           {
//             internalType: 'address',
//             name: 'account',
//             type: 'address',
//           },
//         ],
//         name: 'balanceOf',
//         outputs: [
//           {
//             internalType: 'uint256',
//             name: '',
//             type: 'uint256',
//           },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//       },
//     ];

//     const contract = new web3.eth.Contract(
//       BytesABI,
//       '0xf571900aCe63Bc9b4C8F382bda9062232e4Ff477'
//     );
//     logger.info(`contract is ${contract ? 'not null' : 'null'}`);

//     const amount = await contract.methods
//       .balanceOf('0xD3b5134fef18b69e1ddB986338F2F80CD043a1AF')
//       .call();
//     logger.info(`balance = ${amount.toString()}`);

//     // const amount = await getStakedAmount(request.params.address);
//     return amount;
//   } catch (err) {
//     logger.error(`error: ${JSON.stringify(err)}`);
//     return;
//   }
// });

// Moralis.Cloud.define('balanceOf', async request => {
//   const logger = Moralis.Cloud.getLogger();
//   try {
//     const web3 = Moralis.web3ByChain(chainId);
//     const contract = new web3.eth.Contract(StakingAbi, StakingContract[chainId]);
//     logger.info(`contract is ${contract ? 'not null' : 'null'}`);
//     const userInfo = await contract.methods
//       .userInfo('0x91573f05f34aaF59Ec4849860e61c3762906978E')
//       .call();
//     logger.info(`userInfo is ${userInfo ? JSON.stringify(userInfo) : 'null'}`);
//     const amount = userInfo ? userInfo.amount : 0;

//     // const amount = await getStakedAmount(request.params.address);
//     return amount;
//   } catch (err) {
//     logger.error(`error: ${JSON.stringify(err)}`);
//     return;
//   }
// });
