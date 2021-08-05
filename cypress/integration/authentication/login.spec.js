describe('Login de usuários', () => {
    it('Cenário de login com sucesso', () => {
        cy.visit('/');
        cy.get('body .logo').should('contain', 'Mando Books');
        cy.get('#login').click();
        cy.get('#login-form').should('contain', 'Faça login na sua conta');
        cy.get('input#email').type('onofresalg@outlook.com');
        cy.get('input#password').type('#$%$%DF$fdr4');
        cy.get('button[type="submit"]').click();
        cy.get('#navbar-user-name').should('contain', 'Oi Onofre Salgueiro');
    });

    it('Cenário de login com com erro por e-mail que não existe', () => {
        cy.visit('/');
        cy.get('body .logo').should('contain', 'Mando Books');
        cy.get('#login').click();
        cy.get('#login-form').should('contain', 'Faça login na sua conta');
        cy.get('input#email').type('onofresalg@outlook.co');
        cy.get('input#password').type('#$%$%DF$fdr4');
        cy.get('button[type="submit"]').click();
        cy.get('.MuiAlert-message').should('contain', 'Usuário não encontrado.');
    });

    it('Cenário de login com com erro por senha invalida', () => {
        cy.visit('/');
        cy.get('body .logo').should('contain', 'Mando Books');
        cy.get('#login').click();
        cy.get('#login-form').should('contain', 'Faça login na sua conta');
        cy.get('input#email').type('onofresalg@outlook.com');
        cy.get('input#password').type('#$%$%DF$fdr');
        cy.get('button[type="submit"]').click();
        cy.get('.MuiAlert-message').should('contain', 'Senha invalida.');
    });
});