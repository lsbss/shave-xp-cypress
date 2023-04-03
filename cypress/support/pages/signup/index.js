class SignupPage {

    constructor() {
        this.alertError = '.alert-error'
    }

    submit(name = null, email = null, password = null) {
        cy.visit('/signup')

        cy.get('input[placeholder$=completo]').as('nomeCompleto')
        cy.get('input[placeholder$=email]').as('email')
        cy.get('input[placeholder$=secreta]').as('password')

        if (name) {
            cy.get('@nomeCompleto').type(name);
        }

        if (email) {
            cy.get('@email').type(email);
        }

        if (password) {
            cy.get('@password').type(password);
        }

        cy.contains('button', 'Cadastrar')
            .click()
    }

    noticeShouldBe(expectedText) {
        cy.get('.notice p', {timeout : 10000})
            .should('be.visible')
            .should('have.text', expectedText)
    }

    alertShouldBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)
    }

    requiredFields(nameMessage, emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 3)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(nameMessage)
                expect($small.get(1).textContent).to.equal(emailMessage)
                expect($small.get(2).textContent).to.equal(passwordMessage)
            })
    }

    goHome() {
        cy.contains('a', 'Voltar para login').click()
        cy.get('form h1')
            .should('be.visible')
            .should('have.text', 'Faça seu login')
    }
}

export default new SignupPage()