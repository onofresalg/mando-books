describe('Detalhe de livros', () => {
    it('Cenário de ver detalhes de um livro com sucesso', () => {
        cy.visit('/');
        cy.get('body .logo').should('contain', 'Mando Books');
        cy.get('#book-card-1').should('contain', 'Arquitetura Limpa');
        cy.get('#book-card-see-more-1').click()
        cy.get('h2#book-view-title-1').should('contain', 'Arquitetura Limpa')
    });
});