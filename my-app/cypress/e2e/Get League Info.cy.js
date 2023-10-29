/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */
describe('Get League Info', () => {
  it('should fetch league info and then render the stats page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input[type="tel"]').type('46795');
    cy.contains('Search').click();

    cy.wait(500);

    cy.get('[data-cy="leagueTable"]').should('be.visible');
  });
});
