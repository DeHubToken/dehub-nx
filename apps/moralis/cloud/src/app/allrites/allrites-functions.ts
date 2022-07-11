import { MoralisFunctions } from '@dehub/shared/model';
import { environment } from '../../environments/environment';
import { AuthAllritesReturns } from './allrites.model';

export const authAllritesFn = async (): Promise<AuthAllritesReturns | null> => {
  const logger = Moralis.Cloud.getLogger();
  try {
    const res = await Moralis.Cloud.httpRequest({
      method: 'POST',
      url: 'https://api.vdyo.co/access_token',
      body: {
        client_id: environment.allrites.clientId,
        client_secret: environment.allrites.clientSecret,
        grant_type: 'client_credentials',
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = res.data;
    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      expires: data.expires_in,
    };
  } catch (err) {
    logger.error(
      `${MoralisFunctions.Allrites.Auth} error: ${JSON.stringify(err)}`
    );
    return null;
  }
};
