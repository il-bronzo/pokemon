describe('Pokémon Explorer', () => {
  beforeEach(() => { 
    cy.visit('http://localhost:5173/');
  });

  describe('Pokémon List', () => {
    it('should load the Pokémon list', () => {
      cy.get('.pokemon-list').should('exist');
      cy.get('.pokemon-card').should('have.length', 20);
    });

    it('should load more Pokémon on scroll', () => {
      cy.get('.pokemon-card').should('have.length', 20);
      cy.scrollTo('bottom');
      cy.get('.pokemon-card').should('have.length.greaterThan', 20);
    });
  });

  describe('Pokémon Details Modal', () => {
    beforeEach(() => {
      // Apri la modal prima di ogni test
      cy.get('.pokemon-card').first().find('.details-button').click(); 
      cy.get('.modal-overlay').should('be.visible');
    });

    it('should open Pokémon details modal', () => {
      cy.get('.modal-content').should('contain', 'bulbasaur'); 
    });

    it('should close Pokémon details modal', () => {
      cy.get('.close-btn').click();
      cy.get('.modal-overlay').should('not.exist');
    });

    it('should display Pokémon details correctly', () => {
      cy.get('.modal-content').within(() => {
        cy.get('h2').should('contain', 'bulbasaur');
        cy.get('img').should('have.attr', 'src');
        cy.get('p').eq(0).should('contain', 'Types:'); 
        cy.get('p').eq(1).should('contain', 'Region:'); 
        cy.get('p').eq(2).should('contain', 'Weaknesses:'); 
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors', () => {
      cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon*', { statusCode: 500 }).as('getPokemonsError');
      cy.visit('http://localhost:5173/');
      cy.wait('@getPokemonsError');
      cy.get('.error-message').should('contain', 'Failed to load Pokémon');
    });
  });
});