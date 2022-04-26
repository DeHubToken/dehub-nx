require('../shared/mock.include');
import { Moralis } from 'moralis';
import { environment } from '../../environments/environment';
import { DehubFunctions } from './dehub.model';

const { moralis } = environment;

describe('E2E DeHub functions', function () {
  beforeAll(async () => await Moralis.start(moralis));

  it('Should return circulating supply', async function () {
    const supply = await Moralis.Cloud.run(
      DehubFunctions.TotalCirculatingSupply
    );
    expect(Number(supply)).toBeGreaterThan(0);
  });
});
