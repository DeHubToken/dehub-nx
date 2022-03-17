/*******************************************************
 * Prerequisites
 *
 * Create tables in Moralis Database
 * 1. `VimeoCustomer`
 * userObjectId     string
 * customerId       number
 *
 * 2. `VimeoCustomerProduct`
 * type             number
 * customerId       number
 * productId        number
 ******************************************************/

/*******************************************************
 * Vimeo OTT api
 ******************************************************/

const AuthKey = 'c0ZRWEJ4dTMzWjF4N1ZCa3lwLXloRG9wVzdMTjlTQ3A=';

/**
 * Create vimeo customer
 * OTT API always returns detailed customer information
 * when we register more times
 * @param {*} email user's email address, vimeo requires to email at least
 * @returns detailed customer information if successful,
 *          null if failed
 */
export async function createVimeoCustomer(email: string) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const res = await Moralis.Cloud.httpRequest({
      method: 'POST',
      url: 'https://api.vhx.tv/customers',
      body: {
        name: email,
        email: email,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${AuthKey}`,
      },
    });
    return res.data;
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
}

/**
 * Get all the products granted to existing customer
 * @param {*} customerId
 * @returns list of product id
 */
async function getCustomerProducts(customerId: string) {
  const logger = Moralis.Cloud.getLogger();
  try {
    const res = await Moralis.Cloud.httpRequest({
      method: 'GET',
      url: `https://api.vhx.tv/customers/${customerId}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${AuthKey}`,
      },
    });
    const data = res.data;
    if (data._embedded && data._embedded.products) {
      return data._embedded.products.map((product: { id: string }) => {
        return product.id;
      });
    }
    return [];
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
}
