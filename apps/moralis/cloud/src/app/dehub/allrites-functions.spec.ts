require('../shared/mock.include');
import { Moralis } from 'moralis';
import { environment } from '../../environments/environment';
import { AuthAllritesReturns } from './allrites-functions';

const moralis = environment.moralis;

describe('Allrites', function () {
  beforeAll(async function () {
    await Moralis.start(moralis);
  });

  it('Should return valid access token every time', async function () {
    const ret: AuthAllritesReturns = await Moralis.Cloud.run(
      'authAllrites',
      {}
    );
    expect(ret).not.toBeNull;
    expect(ret.accessToken).toBeDefined;
    expect(ret.expires).toBeDefined;
    expect(ret.tokenType).toBeDefined;

    expect(typeof ret.accessToken).toEqual('string');
    expect(typeof ret.expires).toEqual('number');
    expect(typeof ret.tokenType).toEqual('string');
  });
});
