import express from 'express'
import    { forgotpass, getUser, login, register, resetpass } from '../Controler/AuthControler.js'
import AuthMidd from '../AuthMidd/AuthMidd.js'

const app = express.Router()

app.post('/register',register)
app.post('/login',login)
app.post('/getuser',AuthMidd,getUser)
app.get('/forgotpass',forgotpass)
app.put('/resetpass/:token',resetpass)

export default app 