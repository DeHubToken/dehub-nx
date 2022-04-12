/**
 * Get Moralis User by wallet address
 * Moralis User has multiple wallet address, if contains given address,
 * will return
 * @param {*} address
 * @returns user object if success, null if failed
 */

export async function isMoralisUserByAddress(
  address: string
): Promise<MoralisUser | null> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const query = new Moralis.Query(Moralis.User);
    query.contains('accounts', address);
    const users: MoralisUser[] = await query.find({
      useMasterKey: true,
    });
    if (users && users.length > 0) {
      return users[0];
    }
  } catch (err) {
    logger.error(`isMoralisUserByAddress error: ${JSON.stringify(err)}`);
  }
  return null;
}
