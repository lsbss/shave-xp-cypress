class ResetPassPage {

    go(token) {
        cy.visit('/reset-password?token=' + token)

        cy.get('form h1')
            .should('have.text', 'Resetar senha')
    }

    submit(newPass, confirmPass) {
        cy.get('input[placeholder="Nova Senha"]')
            .type(newPass)
        cy.get('input[placeholder="Confirmação de Senha"]')
            .type(confirmPass)
        cy.contains('button', 'Alterar senha')
            .click()
    }

    noticeShouldBe(expectedText) {
        cy.get('.notice p', {timeout : 10000})
            .should('be.visible')
            .should('have.text', expectedText)
    }
}

export default new ResetPassPage()