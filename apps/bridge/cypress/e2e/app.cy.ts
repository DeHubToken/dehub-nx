import { getLogoImg } from '../support/app.po';

describe('staking', () => {
  beforeEach(() => cy.visit('/'));

  it('should have image with alt contains DeHub', () => {
    getLogoImg().should('have.attr', 'alt').should('include', 'DeHub');
  });
});
