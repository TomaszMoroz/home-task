describe('Main App Component E2E Tests', () => {
  it('displays loading spinner initially', () => {
    cy.intercept('GET', 'http://localhost:3000/stops', {
      delay: 500,
      body: [],
    }).as('getStops');

    cy.visit('/');

    cy.get('.spinner-border').should('be.visible');

    cy.wait('@getStops');
  });

  it('displays data after fetching', () => {
    const mockData = [{ id: 1, name: 'Stop 1' }];

    cy.intercept('GET', 'http://localhost:3000/stops', {
      body: mockData,
    }).as('getStops');

    cy.visit('/');

    cy.wait('@getStops');

    cy.get('.spinner-border').should('not.exist');
    cy.get('router-view').should('exist');
  });

  it('displays error message when fetch fails', () => {
    cy.intercept('GET', 'http://localhost:3000/stops', {
      statusCode: 500,
    }).as('getStops');

    cy.visit('/');

    cy.wait('@getStops');

    cy.get('.spinner-border').should('not.exist');
    cy.get('.error-message').should('be.visible');
  });
});
