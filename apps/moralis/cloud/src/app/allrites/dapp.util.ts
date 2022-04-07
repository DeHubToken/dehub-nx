import { environment } from '../../environments/environment';

export async function getOTTMinTokensToPlay(): Promise<
  typeof Moralis.Cloud.BigNumber | null
> {
  const logger = Moralis.Cloud.getLogger();
  try {
    const DeHubOTTDapp = Moralis.Object.extend(environment.dappName.ott);
    const query = new Moralis.Query(DeHubOTTDapp);
    const config = await query.find();
    return config.length > 0
      ? new Moralis.Cloud.BigNumber(config[0].get('minTokensToPlay')).times(
          new Moralis.Cloud.BigNumber(100000)
        )
      : null;
  } catch (err) {
    logger.error(`getOTTMinTokensToPlay error: ${JSON.stringify(err)}`);
  }
  return null;
}
