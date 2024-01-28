require('../shared/mock.include');
import { MoralisFunctions, Stats } from '@dehub/shared/model';
import { Moralis } from 'moralis-v1';
import { environment } from '../../environments/environment';

const {
  web3: { moralis },
} = environment;

describe('E2E DeHub functions', () => {
  let supply: Stats;
  beforeAll(async () => await Moralis.start(moralis));

  beforeEach(
    async () =>
      (supply = await Moralis.Cloud.run(MoralisFunctions.Dehub.TotalSupply))
  );

  describe('TotalSupply', () => {
    it('Should return BSC total supply', () => {
      expect(supply.totalSupply.bsc).toBeGreaterThan(0);
    });

    it('Should return ETH total supply', () => {
      expect(supply.totalSupply.eth).toBeGreaterThan(0);
    });

    it('Should return Polygon total supply', () => {
      expect(supply.totalSupply.polygon).toBeGreaterThan(0);
    });

    it('Should return BSC active supply', () => {
      const {
        totalSupply: { bsc: totalSupply },
        totalBurned: { bsc: burned },
        activeSupply: { bsc: activeSupply },
      } = supply;
      expect(activeSupply).toBe(totalSupply - burned);
    });

    it('Should return ETH active supply', () => {
      const {
        totalSupply: { eth: totalSupply },
        totalBurned: { eth: burned },
        activeSupply: { eth: activeSupply },
      } = supply;
      expect(activeSupply).toBe(totalSupply - burned);
    });

    it('Should return Polygon active supply', () => {
      const {
        totalSupply: { polygon: totalSupply },
        totalBurned: { polygon: burned },
        activeSupply: { polygon: activeSupply },
      } = supply;
      expect(activeSupply).toBe(totalSupply - burned);
    });
  });
});
