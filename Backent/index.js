import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser, { } from 'cookie-parser'
import session from 'express-session'
import AuthRoute from './Router/AuthRoute.js'
import dotenv, { } from 'dotenv'
import crypto from 'crypto'

const app = express()

app.use(express.json())
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'secret',
  cookie: { maxAge: (34 * 76) }
}))

dotenv.config()

app.get('/', (req, res) => {
  res.send('port running')
}) 


mongoose.connect('mongodb://localhost:27017/redux', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("db connected ");
})

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`port running on ${process.env.PORT}`);
})

app.use('/auth', AuthRoute)