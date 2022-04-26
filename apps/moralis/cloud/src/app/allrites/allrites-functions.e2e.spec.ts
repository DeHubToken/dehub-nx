require('../shared/mock.include');
import { Moralis } from 'moralis';
import { environment } from '../../environments/environment';
import { AllritesFunctions, AuthAllritesReturns } from './allrites.model';

const { moralis } = environment;

describe('E2E Allrites functions', () => {
  beforeAll(async () => await Moralis.start(moralis));

  it('Should return valid access token every time', async () => {
    const ret: AuthAllritesReturns = await Moralis.Cloud.run(
      AllritesFunctions.AuthAllrites
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
