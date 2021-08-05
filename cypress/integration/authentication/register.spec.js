describe('Registro de novos usuários', () => {
    it('Cenário de cadastro com sucesso', () => {
        cy.visit('/');
        cy.get('body .logo').should('contain', 'Mando Books');
        cy.get('#register').click();
        cy.get('#register-form').should('contain', 'Crie uma nova conta');
        cy.get('input#name').type('Onofre Salgueiro');
        cy.get('input#email').type('onofresalg@outlook.com');
        cy.get('input#password').type('#$%$%DF$fdr4');
        cy.get('input#password-confirmation').type('#$%$%DF$fdr4');
        cy.get('button[type="submit"]').click();
        cy.get('#navbar-user-name').should('contain', 'Oi Onofre Salgueiro');
    });

    it('Cenário de cadastro com com erro por e-mail já existente', () => {
        cy.visit('/');
        cy.get('body .logo').should('contain', 'Mando Books');
        cy.get('#register').click();
        cy.get('#register-form').should('contain', 'Crie uma nova conta');
        cy.get('input#name').type('Onofre Salgueiro');
        cy.get('input#email').type('onofresalg@outlook.com');
        cy.get('input#password').type('#$%$%DF$fdr4');
        cy.get('input#password-confirmation').type('#$%$%DF$fdr4');
        cy.get('button[type="submit"]').click();
        cy.get('.MuiAlert-message').should('contain', 'Já existe outro cadastro com esse e-mail.');
    });
});