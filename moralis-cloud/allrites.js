/*******************************************************
 * Prerequirements
 *
 * Add new column in _User table of Moralis Database
 * 1. `can_play`
 * type Boolean
 *
 ******************************************************/

const chainId = '0x61';
// testnet DeHub token address
const DeHubToken = '0xf571900aCe63Bc9b4C8F382bda9062232e4Ff477'.toLowerCase();
const StakingContract =
  '0x1FB2EdfCFcAF5FDb8cb13B138c653De47F781163'.toLowerCase();

// const DeHubTokenMinAmount = new Moralis.Cloud.BigNumber(10 ** 5 * 100000);

/*******************************************************
 * Moralis Configuration
 ******************************************************/
async function getOTTMinTokensToPlay() {
  const logger = Moralis.Cloud.getLogger();
  try {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return new Moralis.Cloud.BigNumber(config.get('OTT_MIN_TOKENS_TO_PLAY'));
  } catch (err) {
    logger.error(JSON.stringify(err));
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
    logger.error(JSON.stringify(err));
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
    logger.error(JSON.stringify(err));
  }
  return null;
}

/**
 * Get DeHub token balance of given wallet address,
 * Of course, we can get it from `BscTokenBalance`
 * @param {*} address
 * @returns amount in big number if success
 */
async function getDeHubBalance(address) {
  const logger = new Moralis.Cloud.getLogger();
  // const query = Moralis.Query('BscTokenBalance');
  // query.equalTo('address', address);
  // const results = await query.find({ useMasterKey: true });
  // logger.info(`DeHub balance: ${JSON.stringify(results)}`);
  // if (results.length > 0) {
  //   return Number(results[0].get('balance'));
  // }
  // return null;

  try {
    const accountTokens = await Moralis.Web3API.account.getTokenBalances({
      chain: chainId,
      address,
    });
    const deHubBalance = accountTokens.filter(
      balance => balance.token_address === DeHubToken
    );
    return new Moralis.Cloud.BigNumber(deHubBalance[0].balance);
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
}

/**
 * Get staked token amount of given wallet address.
 * @param {*} address
 */
async function getStakedAmount(address) {
  const logger = new Moralis.Cloud.getLogger();
  try {
    const web3 = Moralis.web3ByChain(chainId); // BSC
    logger.info(`web3 is ${web3 ? JSON.stringify(web3) : 'null'}`);
    const abi = [
      {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'userInfo',
        outputs: [
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'reflectionDebt', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'reflectionPending',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'harvestDebt', type: 'uint256' },
          { internalType: 'uint256', name: 'harvestPending', type: 'uint256' },
          { internalType: 'bool', name: 'harvested', type: 'bool' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];

    // create contract instance
    const contract = new web3.eth.Contract(abi, StakingContract);
    logger.info(`contract is ${contract ? 'not null' : 'null'}`);

    // get contract name
    const userInfo = await contract.methods.userInfo().call(address);
    logger.info(`userInfo: ${JSON.stringify(userInfo)}`);

    return userInfo.amount;
  } catch (err) {
    logger.error(JSON.stringify(err));
    logger.error(err);
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
      logger.error('Not found Moralis User');
    }
  } catch (err) {
    logger.error(JSON.stringify(err));
  }
}

/*******************************************************
 * Moralis Triggers
 ******************************************************/
/**
 * Subscribe the balance table, and if DeHub token balance has changed,
 * set `can_play` flag as true/false according to the holding balance.
 * The updates on this variable will automatically trigger calling to Allrites
 * so as to give an access to user
 */
Moralis.Cloud.afterSave('BscTokenBalance', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const tokenAddress = request.object.get('token_address');
    if (tokenAddress === DeHubToken) {
      const address = request.object.get('address');

      const user = await isMoralisUserByAddress(address);
      if (!user) {
        logger.info(`user not found: ${address}`);
        return;
      }
      const balance = await getDeHubBalance(address);
      logger.info(`user DeHub balance(${address}): ${balance}`);

      const minAmount = await getOTTMinTokensToPlay();
      if (!minAmount) {
        logger.error('Failed to get OTT min tokens to play');
        return;
      }

      await setCanPlay(user, balance.gte(minAmount) ? true : false);
    }
  } catch (err) {
    logger.error(JSON.stringify(err));
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
//     const config = await Moralis.Config.get({ useMasterKey: true });
//     logger.info(`config: ${JSON.stringify(config)}`);
//     logger.info(
//       `config.OTT_MIN_TOKENS_TO_PLAY: ${config.get('OTT_MIN_TOKENS_TO_PLAY')}`
//     );
//     return JSON.stringify(config);
//   } catch (err) {
//     logger.error(JSON.stringify(err));
//     return;
//   }
// });

Moralis.Cloud.define('stakingAmount', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const amount = await getStakedAmount(request.params.address);
    return amount;
  } catch (err) {
    logger.error(JSON.stringify(err));
    return;
  }
});
