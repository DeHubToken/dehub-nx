import { sharedMoralis } from './shared-moralis';

describe('sharedMoralis', () => {
  it('should work', () => {
    expect(sharedMoralis()).toEqual('shared-moralis');
  });
});
