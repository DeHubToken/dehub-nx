require('../shared/mock.include');
import { MoralisFunctions } from '@dehub/shared/model';
import { Moralis } from 'moralis-v1';
import { environment } from '../../environments/environment';

const { moralis } = environment;

describe('E2E DeHub functions', () => {
  beforeAll(async () => await Moralis.start(moralis));

  it('Should return circulating supply', async () => {
    const supply = await Moralis.Cloud.run(
      MoralisFunctions.Dehub.TotalCirculatingSupply
    );
    expect(Number(supply)).toBeGreaterThan(0);
  });
});
