import signupPage from '../support/pages/signup'
import data from '../fixtures/users.json'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import signup from '../support/pages/signup'
import login from '../support/pages/login'
describe('signup', () => {

    context('quando submeto formulário', () => {
        it('deve cadastrar nova conta com sucesso', () => {
            const user = data.success

            cy.deleteUser(user)

            signupPage.submit(user.name, user.email, user.password)
            signupPage.noticeShouldBe('Boas vindas, faça login para solicitar serviços!')
            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve cadastrar conta já existente', () => {
            const user = data.success

            cy.createUser(user)

            signupPage.submit(user.name, user.email, user.password)
            signupPage.noticeShouldBe('Oops! E-mail já cadastrado.')
        })

        it('campos obrigatórios', () => {
            signupPage.submit()
            signupPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória')
        })


        context('senha inválida', () => {
            data.shortpass.forEach((p) => {
                it(`não deve criar conta com senha ${p}`, () => {
                    signupPage.submit('Senhudo Inválido', 'senhudo@invalido.com', p)
                    signupPage.alertShouldBe('Pelo menos 6 caracteres')
                })
            })
        })

        context('email inválido', () => {
            data.invemails.forEach((p) => {
                it('não deve criar conta com email ', () => {
                    signupPage.submit('Senhudo Inválido', p, 'abcd1234')   
                    signupPage.alertShouldBe('Informe um email válido') 
                })
            })
        })

        context('navegação', () => {
            it('ir e voltar', () => {
                loginPage.submit()
                loginPage.goSignup()
                signup.goHome()  
            })
        })
        
    })

})