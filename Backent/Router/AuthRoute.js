import express from 'express'
import    { getUser, login, register } from '../Controler/AuthControler.js'
import AuthMidd from '../AuthMidd/AuthMidd.js'

const app = express.Router()

app.post('/register',register)
app.post('/login',login)
app.post('/getuser',AuthMidd,getUser)

export default app 