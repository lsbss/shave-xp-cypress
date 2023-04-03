const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')
const { deleteUser, insertUser, findToken } = require('./db')
const app = express()
const validator = require('express-joi-validation').createValidator({
    passError: true
})

app.use(express.json())

const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    is_shaver: Joi.boolean().required()
})

app.get('/token/:email', async function (req, res) {
    const {email} = req.params
    const token = await findToken(email)

    if(!token) {
        return res.status(400).end()
    }

    res.status(200).json(token)
})

app.delete('/user/:email', async function (req, res) {
    const { email } = req.params
    await deleteUser(email)
    res.status(204).end()
})

app.post('/user', validator.body(UserSchema), async function (req, res) {
    const { name, email, password, is_shaver } = req.body
    const hashPass = await bcrypt.hash(password, 8)
    const user = {
        name: name,
        email: email,
        password: hashPass,
        is_shaver: is_shaver
    }


    try {
        const id = await insertUser(user)
        res.status(201).json({ user_id: id })
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro', stack: error })
    }

})

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type, 
            message: err.error.toString()
        });
    } else {
        next(err);
    }
});

app.listen(5000)