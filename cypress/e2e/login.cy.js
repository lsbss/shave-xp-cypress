import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', ()=> {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = {
                email: 'leo@teste.com.br',
                password: 'abcd@1234',
                name: 'Leonardo'
            }
    
            loginPage.submit(user.email, user.password)

            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                email: 'leonardo@teste.com.br',
                password: '123456',
                name: 'Leonardo'
            }
            
            loginPage.submit(user.email, user.password)
            
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('não deve logar com email incorreto', () => {
            const user = {
                email: 'leonardo@teste.com.br',
                password: 'abcd@1234',
                name: 'Leonardo'
            }
            
            loginPage.submit(user.email, user.password)
            
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

        context('senha muito curta', () => {

            const password = [
                '1',
                '123',
                '12345'
            ]

            password.forEach((p) => {
                it(`não deve logar com a senha ${p}`, () => {
                    loginPage.submit('leonardo@teste.com.br', p)
                    loginPage.alertShouldBe('Pelo menos 6 caracteres')
                })
            })
        })

        context('email inválidos', () => {

            const emails = [
                'leo&teste.com',
                'leo.com.br',
                '@leo.com.br',
                '123144'
            ]

            emails.forEach((e) => {
                it(`não deve logar com o email ${e}`, () => {
                    loginPage.submit(e, 'sdfsfsdfsf')
                    loginPage.alertShouldBe('Informe um email válido')
                })
            })
        })
        
    })
})