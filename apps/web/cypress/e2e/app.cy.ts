import { getLogoImg } from '../support/app.po';

describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('should have image with alt contains DeHub', () => {
    getLogoImg().should('have.attr', 'alt').should('include', 'DeHub');
  });
});
