describe('Line and Stop Selection Component E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('selects a line and displays its details', () => {
    cy.get('button').contains('Select Line').click();
    cy.get('.list-group-item').contains('Line 1').click();

    cy.get('.display-details').should('contain', 'Line 1');
  });

  it('selects a stop and displays its schedule', () => {
    cy.get('button').contains('Select Line').click();
    cy.get('.list-group-item').contains('Line 1').click();

    cy.get('.list-group-item').contains('Stop A').click();

    cy.get('.display-details').should('contain', 'Schedule for Stop A');
  });
});
