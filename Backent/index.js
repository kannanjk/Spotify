import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import AuthRoute from './Router/AuthRoute.js'
import dotenv,{} from 'dotenv'

const app = express()

app.use(bodyParser.json())
dotenv.config()
app.get('/',(req,res)=>{
    res.send('Hello World')
})

  mongoose.connect('mongodb://localhost:27017/redux',{
    useNewUrlParser: true, 
    useUnifiedTopology: true   
  }).then(()=>{
    console.log("db connected ");
  })

app.listen(process.env.PORT,(error)=>{
    if (error) {
        console.log(error);
    }
    console.log(`port running on ${process.env.PORT}`);
})

app.use('/auth',AuthRoute)