/*******************************************************
 * PreRequirements
 *
 *
 * 1. Add new column `can_play` in _User table of Moralis Database
 * type Boolean
 * 2. Sync DeHub Token Transfer events and name table as `DeHubTokenTransferEvents`
 * 3. Sync DeHub Staking events and name table as following
 * Deposit -> DeHubStakingDepositEvents
 * Harvested -> DeHubStakingHarvestedEvents
 * Withdraw -> DeHubStakingWithdrawEvents
 * 4. Set following variables in Moralis Config
 * https://docs.moralis.io/moralis-server/cloud-code/config#config
 * DEHUB_STAKING_ABI_MAINNET   Array   Abi for staking contract, [...]
 * DEHUB_STAKING_MAINNET   String   Address to staking contract
 * DEHUB_TOKEN_ABI_MAINNET   Array   Abi for $DeHub contract, [...]
 * DEHUB_TOKEN_MAINNET   String   Address to $DeHub contract
 * OTT_MIN_TOKENS_TO_PLAY  Number   Min token amount to set can_play, def:500000
 *
 ******************************************************/

const BSC_MAINNET = '0x38';
const BSC_TESTNET = '0x61';

const defChainId = BSC_MAINNET;
const stakingDappName = 'DeHubStakingDapp';
const tokenDappName = 'DeHubTokenDapp';
const ottDappName = 'DeHubOTTDapp';
const DeHubTokenDecimals = new Moralis.Cloud.BigNumber(100000);

/*******************************************************
 * DeHub D'app configurations
 ******************************************************/
/**
 * Get contract properties and address/abis
 * @returns array of contract, every contract has 4 common properties
 * they are: address, name, chainId, abi
 */
async function getDeHubContracts(dappName) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const Contracts = Moralis.Object.extend('Contracts');
    const DeHubDapp = Moralis.Object.extend(dappName);

    const contractQuery = new Moralis.Query(Contracts);
    const dappQuery = new Moralis.Query(DeHubDapp);

    dappQuery.matchesQuery('contract', contractQuery);
    dappQuery.include('contract');

    const contracts = await dappQuery.find();
    for (let i = 0; i < contracts.length; i++) {
      const contract = contracts[i].get('contract');

      const address = contract.get('address');
      const name = contract.get('name');
      const chainId = contract.get('chainId');
      const abi = contract.get('abi');

      contracts[i].set('address', address);
      contracts[i].set('name', name);
      contracts[i].set('chainId', chainId);
      contracts[i].set('abi', abi);
    }
    return contracts;
  } catch (err) {
    logger.error(`getDeHubContracts error: ${JSON.stringify(err)}`);
  }
  return null;
}

async function getDeHubTokenContract(targetChainId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = parseInt(targetChainId, 16);

    const contracts = await getDeHubContracts(tokenDappName);
    const filters = contracts.filter(contract => {
      const chainId = contract.get('chainId');
      if (parseInt(chainId) !== decTargetChainId) {
        return false;
      }
      return true;
    });

    return filters.length > 0 ? filters[0] : null;
  } catch (err) {
    logger.error(`getDeHubTokenContract error: ${JSON.stringify(err)}`);
  }
  return null;
}

async function getActiveStakingContracts(targetChainId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const decTargetChainId = parseInt(targetChainId, 16);

    const date = new Date();
    const contracts = await getDeHubContracts(stakingDappName);
    const filters = contracts.filter(contract => {
      const chainId = contract.get('chainId');
      if (parseInt(chainId) !== decTargetChainId) {
        return false;
      }

      const year = contract.get('year');
      const quarter = contract.get('quarter');
      if (
        date.getFullYear() !== year ||
        parseInt(date.getUTCMonth() / 4) !== quarter - 1
      ) {
        return false;
      }
      return true;
    });

    return filters.length > 0 ? filters[0] : null;
  } catch (err) {
    logger.error(`getActiveStakingContracts error: ${JSON.stringify(err)}`);
  }
  return null;
}

async function getOTTMinTokensToPlay() {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubOTTDapp = Moralis.Object.extend(ottDappName);
    const query = new Moralis.Query(DeHubOTTDapp);
    const config = await query.find();
    return config.length > 0
      ? new Moralis.Cloud.BigNumber(config[0].get('minTokensToPlay')).times(
          DeHubTokenDecimals
        )
      : null;
  } catch (err) {
    logger.error(`getOTTMinTokensToPlay error: ${JSON.stringify(err)}`);
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
 * @param {*} chainId network id in hex
 * @param {*} address user address
 * @param {*} tokenAddress ERC20 token address
 * @returns amount in big number if success
 */
async function getTokenBalance(chainId, address, tokenAddress) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const accountTokens = await Moralis.Web3API.account.getTokenBalances({
      chain: chainId,
      address,
    });
    const filtered = accountTokens.filter(
      balance => balance.token_address === tokenAddress.toLowerCase()
    );
    return filtered.length > 0
      ? new Moralis.Cloud.BigNumber(filtered[0].balance)
      : new Moralis.Cloud.BigNumber(0);
  } catch (err) {
    logger.error(`getTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

/**
 * Get staked token amount of given wallet address.
 * @param {*} chainId network id in hex
 * @param {*} address user address
 */
async function getDeHubTokenBalance(chainId, address) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const contract = await getDeHubTokenContract(chainId);
    return getTokenBalance(chainId, address, contract.get('address'));
  } catch (err) {
    logger.error(`getDeHubTokenBalance error: ${JSON.stringify(err)}`);
    return null;
  }
}

/**
 * Get staked token amount of given wallet address.
 * @param {*} chainId network id in hex
 * @param {*} address user address
 */
async function getStakedAmount(chainId, address) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const contractInfo = await getActiveStakingContracts(chainId);
    const web3 = Moralis.web3ByChain(chainId);
    // create contract instance
    const contract = new web3.eth.Contract(
      contractInfo.get('abi'),
      contractInfo.get('address')
    );
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
  const logger = Moralis.Cloud.getLogger();
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
async function updateCanPlay(chainId, address) {
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

    await updateCanPlay(defChainId, fromAddress);
    await updateCanPlay(defChainId, toAddress);
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

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`DeHubStakingDepositEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingHarvestEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingHarvestEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`DeHubStakingHarvestEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.afterSave('DeHubStakingWithdrawEvents', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const address = request.object.get('user');
    logger.info(`Noticed DeHubStakingWithdrawEvents, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`DeHubStakingWithdrawEvents error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.beforeLogin(async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const { object: user } = request;
    const address = user.get('ethAddress');
    logger.info(`Noticed beforeLogin, address: ${address}`);

    await updateCanPlay(defChainId, address);
  } catch (err) {
    logger.error(`beforeLogin error: ${JSON.stringify(err)}`);
    return;
  }
});

Moralis.Cloud.define('getStakingContracts', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const contracts = await getDeHubContracts(stakingDappName);

    let collect = [];
    for (let i = 0; i < contracts.length; i++) {
      const year = contracts[i].get('year');
      const quarter = contracts[i].get('quarter');

      const contract = contracts[i].get('contract');
      const address = contract.get('address');

      const name = contract.get('name');
      const chainId = contract.get('chainId');
      const abi = contract.get('abi');

      collect.push({
        year,
        quarter,
        address,
        name,
        chainId,
        abi,
      });
    }
    return collect;
  } catch (err) {
    logger.error(`getStakingContracts error: ${JSON.stringify(err)}`);
    return null;
  }
});

Moralis.Cloud.define('getActiveStakingContracts', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const activeContract = await getActiveStakingContracts(defChainId);
    if (!activeContract) {
      return null;
    }

    const year = activeContract.get('year');
    const quarter = activeContract.get('quarter');

    const contract = activeContract.get('contract');
    const address = contract.get('address');

    const name = contract.get('name');
    const chainId = contract.get('chainId');
    const abi = contract.get('abi');

    return {
      year,
      quarter,
      address,
      name,
      chainId,
      abi,
    };
  } catch (err) {
    logger.error(`getStakingContracts error: ${JSON.stringify(err)}`);
    return null;
  }
});
