const chainId = '0x61';
// testnet DeHub token address
const DeHubToken = '0x5A5e32fE118E7c7b6536d143F446269123c0ba74'.toLowerCase();

const DeHubTokenMinAmount = 10 ** 5 * 100000;

/**
 * List the products which are on the platform
 * @returns list of detailed product information if successful,
 *          null if failed
 */
async function getListProducts(page, perPage) {
  try {
    const res = await Moralis.Cloud.httpRequest({
      method: 'GET',
      url: `https://api.vhx.tv/products?active=true&sort=newest&&page=${
        page === undefined ? 1 : page
      }&per_page=${perPage === undefined ? 50 : perPage}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${AuthKey}`,
      },
    });
    const data = res.data;
    return {
      count: data.count,
      total: data.total,
      products:
        data._embedded && data._embedded.products
          ? data._embedded.products.map(product => product.id)
          : [],
    };
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
}

/**
 * Get all the products listed in Vimeo
 * @returns all the products
 */
async function getAllProducts() {
  const list = await getListProducts();
  if (!list) {
    return null;
  }

  for (
    let page = 2;
    list.count < list.total && page < Math.ceil(list.total / 50);
    page++
  ) {
    const next = await getListProducts(page);
    list.count += next.count;
    list.products = [...list.products, ...next.products];
  }
  return list;
}

/**
 * Add a product to existing customer
 * If product is a kind of subscription, OTT API returns error message
 * (code 422) when added multiple times
 * If product is a kind of buy or rent product, OTT API always returns list of
 * products which are already added to current customer
 * @param {*} customerId
 * @param {*} productId
 * @returns true if successful, false if failed
 */
async function grantAccessProduct(customerId, productId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const res = await Moralis.Cloud.httpRequest({
      method: 'PUT',
      url: `https://api.vhx.tv/customers/${customerId}/products`,
      body: {
        href: `https://api.vhx.tv/customers/${customerId}`,
        product: `https://api.vhx.tv/products/${productId}`,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${AuthKey}`,
      },
    });
    const data = res.data;
    if (data._embedded && data._embedded.products) {
      const found = data._embedded.products.filter(
        product => product.id === productId
      );
      if (found && found.length > 0) {
        return true;
      }
    }
    // User already has access to this product (422)
    if (data.message && data.message.contains('(422)')) {
      // only for subscription product
      return true;
    }
    // if not found product
    return false;
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
}

/**
 * Remove a product to existing customer
 * OTT API returns the remaining products, so that we can check if still exists
 * @param {*} customerId
 * @param {*} productId
 * @returns true if successful, false if failed
 */
async function degrantAccessProduct(customerId, productId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const res = await Moralis.Cloud.httpRequest({
      method: 'DELETE',
      url: `https://api.vhx.tv/customers/${customerId}/products`,
      body: {
        href: `https://api.vhx.tv/customers/${customerId}`,
        product: `https://api.vhx.tv/products/${productId}`,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${AuthKey}`,
      },
    });
    const data = res.data;
    if (data.id === customerId) {
      return true;
    }

    // Resource not found (404)
    return false;
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
}

/*******************************************************
 * Query and Update on Moralis Database
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
 * Store the pair of Moralis User object id and Vimeo customer id
 * in `VimeoCustomer` table
 * @param {*} userObjectId
 * @param {*} customerId
 * @returns true if success, false if failed
 */
async function registerVimeoCustomer(userObjectId, customerId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const Vimeo = Moralis.Object.extend('VimeoCustomer');
    const vimeo = new Vimeo();
    vimeo.set('userObjectId', userObjectId);
    vimeo.set('customerId', customerId);
    await vimeo.save();
    return true;
  } catch (err) {
    logger.error(JSON.stringify(err));
    return false;
  }
}

/**
 * Get Vimeo customer id by Moralis User object id from `VimeoCustomer` table
 * @param {*} userObjectId
 * @returns
 */
async function isVimeoCustomer(userObjectId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const query = new Moralis.Query('VimeoCustomer');
    query.equalTo('userObjectId', userObjectId);
    const customers = await query.find({ useMasterKey: true });
    if (customers && customers.length > 0) {
      return customers[0];
    }
  } catch (err) {
    logger.error(JSON.stringify(err));
  }
  return null;
}

/**
 * Record grant/degrant access on products in `VimeoCustomerProduct` table
 * @param {*} type 1: grant, 2: degrant
 * @param {*} customerId
 * @param {*} productId
 * @returns
 */
async function trackProductAccess(type, customerId, productId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const VimeoCustomerProduct = Moralis.Object.extend('VimeoCustomerProduct');
    const vimeoCustomerProduct = new VimeoCustomerProduct();
    vimeoCustomerProduct.set('type', type);
    vimeoCustomerProduct.set('customerId', customerId);
    vimeoCustomerProduct.set('productId', productId);
    await vimeoCustomerProduct.save();
    return true;
  } catch (err) {
    logger.error(JSON.stringify(err));
    return false;
  }
}

/**
 * Get DeHub token balance of given wallet address,
 * Of course, we can get it from `BscTokenBalance`
 * @param {*} address
 * @returns amount in big number if success
 */
async function getDeHubBalance(address) {
  // const logger = new Moralis.Cloud.getLogger();
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
    return Number(deHubBalance[0].balance);
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
}

/*******************************************************
 * Grant access on products
 ******************************************************/
/**
 * Grant the access of all the products on the existing customer
 * Find the list of products not added, and grant them access
 * @param {*} customerId
 */
async function grantAllProductsAccess(customerId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const list = await getAllProducts();
    logger.info(
      `all products(${customerId}): ${JSON.stringify(list.products)}`
    );
    const myProducts = await getCustomerProducts(customerId);
    logger.info(`my products(${customerId}): ${JSON.stringify(myProducts)}`);

    const notRegistered = list.products.filter(
      productId => !myProducts.find(myProduct => myProduct === productId)
    );
    logger.info(
      `not registered products(${customerId}): ${JSON.stringify(notRegistered)}`
    );

    let newGranted = 0;
    for (const newId of notRegistered) {
      if (await grantAccessProduct(customerId, newId)) {
        await trackProductAccess(1, customerId, newId);
        logger.info(`grant access product: ${customerId}, ${newId}`);
        newGranted++;
      }
    }

    return {
      all: list.products.length,
      before: myProducts.length,
      now: newGranted,
    };
  } catch (err) {
    logger.error(JSON.stringify(err));
  }
}

/**
 * DeGrant the access of all the products on the existing customer
 * Finding the list of products already added, degrant them access
 * @param {*} customerId
 */
async function degrantAllProductsAccess(customerId) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const list = await getAllProducts();
    logger.info(
      `all products(${customerId}): ${JSON.stringify(list.products)}`
    );
    const myProducts = await getCustomerProducts(customerId);
    logger.info(`my products(${customerId}): ${JSON.stringify(myProducts)}`);

    const registered = list.products.filter(productId =>
      myProducts.find(myProduct => myProduct === productId)
    );
    logger.info(
      `registered products(${customerId}): ${JSON.stringify(registered)}`
    );

    let newDeGranted = 0;
    for (const newId of registered) {
      if (await degrantAccessProduct(customerId, newId)) {
        await trackProductAccess(2, customerId, newId);
        logger.info(`degrant access product: ${customerId}, ${newId}`);
        newDeGranted++;
      }
    }

    return {
      all: list.products.length,
      before: myProducts.length,
      now: newDeGranted,
    };
  } catch (err) {
    logger.error(JSON.stringify(err));
  }
}

/*******************************************************
 * Moralis Cloud functions
 ******************************************************/
/**
 * Every time user connected to wallet and logined to Moralis, the frontend
 * will call this function.
 * This function checks the balance of given address, if has more than limit
 * amount, automatically grant all the access
 * if not enough, degrant all the access
 */
Moralis.Cloud.define('signupUser', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    // check if a moralis user
    const user = await isMoralisUser(request.params.objectId);
    if (!user) {
      logger.error(`Not found user: ${request.params.objectId}`);
      return null;
    }
    logger.info(`moralis user: ${JSON.stringify(user)}`);
    // if (!linkUser(user, request.params.address)) {
    //   logger.error(
    //     `Not linked address: ${request.params.objectId}, ${request.params.address}`
    //   );
    //   return null;
    // }

    // creating vimeo customer
    const customer = await isVimeoCustomer(request.params.objectId);
    let customerId = 0;
    if (customer) {
      customerId = customer.get('customerId');
    } else {
      const newCustomer = await createVimeoCustomer(request.params.email);
      logger.info(`creating vimeo: ${JSON.stringify(newCustomer)}`);
      if (!newCustomer) {
        logger.error(
          `Creating Vimeo customer failed: ${request.params.objectId}, ${request.params.email}`
        );
        return null;
      }

      if (
        !(await registerVimeoCustomer(request.params.objectId, newCustomer.id))
      ) {
        logger.error(
          `Registering Vimeo customer failed: ${request.params.objectId}, ${newCustomer.id}`
        );
        return null;
      }
      user.setEmail(request.params.email);
      user.save();
      customerId = newCustomer.id;
    }

    const balance = await getDeHubBalance(request.params.address);
    logger.info(
      `balance(${customerId}, ${request.params.address}): ${balance}`
    );

    let grant = {};
    if (balance >= DeHubTokenMinAmount) {
      // do grant asynchorously
      grant = await grantAllProductsAccess(customerId);
    } else {
      // do degrant asynchorously
      grant = await degrantAllProductsAccess(customerId);
    }

    return {
      customerId,
      balance,
      products: grant,
    };
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
});

/**
 * Subscribe the balance table, and if DeHub token balance has changed,
 * grant/degrant all the access according to the holding balance
 */
Moralis.Cloud.afterSave('BscTokenBalance', async request => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const tokenAddress = request.object.get('token_address');
    if (tokenAddress === DeHubToken) {
      const address = request.object.get('address');
      const balance = await getDeHubBalance(address);
      logger.info(`user DeHub balance(${address}): ${balance}`);

      const user = await isMoralisUserByAddress(address);
      if (!user) {
        logger.info(`user not found: ${address}`);
        return;
      }
      const customer = await isVimeoCustomer(user.id);
      if (!customer) {
        logger.info(`customer not found: ${user.id}`);
        return;
      }
      const customerId = customer.get('customerId');

      if (balance >= DeHubTokenMinAmount) {
        // do grant asynchorously
        grantAllProductsAccess(customerId);
      } else {
        // do degrant asynchorously
        degrantAllProductsAccess(customerId);
      }
    }
  } catch (err) {
    logger.error(JSON.stringify(err));
    return;
  }
});
