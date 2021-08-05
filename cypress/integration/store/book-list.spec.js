describe('Lista de livros', () => {
    it('Cenário de listar livros com sucesso', () => {
        cy.visit('/');
        cy.get('body .logo').should('contain', 'Mando Books');
        cy.get('#book-card-1').should('contain', 'Arquitetura Limpa');
    });
});