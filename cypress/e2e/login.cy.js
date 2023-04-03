import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

import data from '../fixtures/users.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = data.success
            cy.createUser(user)

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpass
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)
        })

        it('não deve logar com email incorreto', () => {
            const user = data.email404
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

        context('senha muito curta', () => {
            data.shortpass.forEach((p) => {
                it(`não deve logar com a senha ${p}`, () => {
                    loginPage.submit('leonardo@teste.com.br', p)
                    loginPage.alertShouldBe('Pelo menos 6 caracteres')
                })
            })
        })

        context('email inválidos', () => {
            data.invemails.forEach((e) => {
                it(`não deve logar com o email ${e}`, () => {
                    loginPage.submit(e, 'sdfsfsdfsf')
                    loginPage.alertShouldBe('Informe um email válido')
                })
            })
        })

    })
})